import { NavLink } from "react-router-dom";


const nav = [
  {
    id: 0,
    title: "재고 검색",
    url: "/foodManage/search",
  },
  {
    id: 1,
    title: "재고 현황",
    url: "/foodManage/status",
  },
  {
    id: 2,
    title: "판매",
    url: "/foodManage/sell",
  },
];


const FoodNavigation = () => {
  return (
    <div
      style={{
        display: "flex",
        padding: 10,
      }}
    >
      {nav.map((n, idx) => (
        <div style={{ padding: 10 }} key={idx}>
          <NavLink
            key={n.id}
            style={({ isActive }) => (isActive ? { color: "red" } : undefined)}
            to={n.url}
          >
            {n.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};


export default FoodNavigation;
