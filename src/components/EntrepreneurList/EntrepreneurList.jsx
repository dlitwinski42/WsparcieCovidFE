import react, { useEffect, useState } from "react";
import EntrepreneurService from "../../services/entrepreneurs";

const EntrepreneurList = () => {
  const [list, setList] = useState();
  useEffect(() => getEntrepreneur(), []);

  const getEntrepreneur = async () => {
    let data = await EntrepreneurService.getEntrepreneur();
    console.log(data);
    let array = data.map((entrepreneur) => (
      <div>
        {" "}
        ================ <br />
        {entrepreneur.name} <br />
      </div>
    ));
    setList(array);
  };

  return <div>{list} ================</div>;
};

export default EntrepreneurList;
