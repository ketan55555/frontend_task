import StatusFilters from "./StatusFilters";
import OwnersFilters from "./OwnersFilters";
const Filters: React.FC = ({toggleFilter}) => {
  return (
    <div className="">
      <StatusFilters toggleFilter={toggleFilter} />
   
      <OwnersFilters  />
    </div>
  );
};

export default Filters;
