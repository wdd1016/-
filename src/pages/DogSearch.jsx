import axios from "axios";
import { useState, useEffect } from "react";
import "./DogSearch.css";

export default function DogSearch() {
  const [name, setName] = useState("");
  const [dogs, setDogs] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const searchDog = () => {
    setDogs([]);

    const correctNames = dogNames.filter((dogName) => dogName.includes(name));
    if (correctNames.length === 0) {
      setIsSearch(true);
      setIsEmpty(true);
      return;
    }

    correctNames.forEach((dogName) => {
      const breedPath = dogName.replaceAll("-", "/");

      axios
        .get(`https://dog.ceo/api/breed/${breedPath}/images/random`)
        .then((response) => {
          setDogs((prev) => [
            ...prev,
            {
              name: dogName,
              url: response.data.message,
            },
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    setIsEmpty(false);
  };

  // dogs 상태가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log(dogs);
  }, [dogs]);

  return (
    <>
      <div className="dog-search-container">
        <h1 className="dog-search-title">강아지 조회</h1>
        <div className="dog-search-box">
          <input
            className="dog-search-input"
            type="text"
            placeholder="input english partial or entire dog name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="dog-search-button" onClick={searchDog}>
            조회
          </button>
        </div>

        {/* 검색 결과가 없을 때 */}
        {isSearch && isEmpty && (
          <div className="dog-search-no-result">검색 결과가 없습니다.</div>
        )}

        {/* 검색 중일 때 */}
        {isSearch && !isEmpty && (
          <div className="dog-search-no-result">검색 중 입니다.</div>
        )}

        {/* 검색 결과가 있을 때 카드 형태로 보여주기 */}
        <div className="dog-cards-wrapper">
          {dogs.map((dog, index) => (
            <div className="dog-card" key={index}>
              <h2 className="dog-card-name">{dog.name}</h2>
              <img className="dog-card-image" src={dog.url} alt={dog.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const dogNames = [
  "affenpinscher",
  "african",
  "airedale",
  "akita",
  "appenzeller",
  "australian-kelpie",
  "australian-shepherd",
  "bakharwal-indian",
  "basenji",
  "beagle",
  "bluetick",
  "borzoi",
  "bouvier",
  "boxer",
  "brabancon",
  "briard",
  "buhund-norwegian",
  "bulldog-boston",
  "bulldog-english",
  "bulldog-french",
  "bullterrier-staffordshire",
  "cattledog-australian",
  "cavapoo",
  "chihuahua",
  "chippiparai-indian",
  "chow",
  "clumber",
  "cockapoo",
  "collie-border",
  "coonhound",
  "corgi-cardigan",
  "cotondetulear",
  "dachshund",
  "dalmatian",
  "dane-great",
  "danish-swedish",
  "deerhound-scottish",
  "dhole",
  "dingo",
  "doberman",
  "elkhound-norwegian",
  "entlebucher",
  "eskimo",
  "finnish-lapphund",
  "frise-bichon",
  "gaddi-indian",
  "germanshepherd",
  "greyhound-indian",
  "greyhound-italian",
  "groenendael",
  "havanese",
  "hound-afghan",
  "hound-basset",
  "hound-blood",
  "hound-english",
  "hound-ibizan",
  "hound-plott",
  "hound-walker",
  "husky",
  "keeshond",
  "kelpie",
  "kombai",
  "komondor",
  "kuvasz",
  "labradoodle",
  "labrador",
  "leonberg",
  "lhasa",
  "malamute",
  "malinois",
  "maltese",
  "mastiff-bull",
  "mastiff-english",
  "mastiff-indian",
  "mastiff-tibetan",
  "mexicanhairless",
  "mix",
  "mountain-bernese",
  "mountain-swiss",
  "mudhol-indian",
  "newfoundland",
  "otterhound",
  "ovcharka-caucasian",
  "papillon",
  "pariah-indian",
  "pekinese",
  "pembroke",
  "pinscher-miniature",
  "pitbull",
  "pointer-german",
  "pointer-germanlonghair",
  "pomeranian",
  "poodle-medium",
  "poodle-miniature",
  "poodle-standard",
  "poodle-toy",
  "pug",
  "puggle",
  "pyrenees",
  "rajapalayam-indian",
  "redbone",
  "retriever-chesapeake",
  "retriever-curly",
  "retriever-flatcoated",
  "retriever-golden",
  "ridgeback-rhodesian",
  "rottweiler",
  "saluki",
  "samoyed",
  "schipperke",
  "schnauzer-giant",
  "schnauzer-miniature",
  "segugio-italian",
  "setter-english",
  "setter-gordon",
  "setter-irish",
  "sharpei",
  "sheepdog-english",
  "sheepdog-indian",
  "sheepdog-shetland",
  "shiba",
  "shihtzu",
  "spaniel-blenheim",
  "spaniel-brittany",
  "spaniel-cocker",
  "spaniel-irish",
  "spaniel-japanese",
  "spaniel-sussex",
  "spaniel-welsh",
  "spitz-indian",
  "spitz-japanese",
  "springer-english",
  "stbernard",
  "terrier-american",
  "terrier-australian",
  "terrier-bedlington",
  "terrier-border",
  "terrier-cairn",
  "terrier-dandie",
  "terrier-fox",
  "terrier-irish",
  "terrier-kerryblue",
  "terrier-lakeland",
  "terrier-norfolk",
  "terrier-norwich",
  "terrier-patterdale",
  "terrier-russell",
  "terrier-scottish",
  "terrier-sealyham",
  "terrier-silky",
  "terrier-tibetan",
  "terrier-toy",
  "terrier-welsh",
  "terrier-westhighland",
  "terrier-wheaten",
  "terrier-yorkshire",
  "tervuren",
  "vizsla",
  "waterdog-spanish",
  "weimaraner",
  "whippet",
  "wolfhound-irish",
];
