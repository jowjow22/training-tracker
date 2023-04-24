import Chart from "../components/Chart";
import classes from "./index.module.scss";

const chartInfo = {
  labels: ["January", "February", "March", "April", "May", "June"],
  data: [33, 50, 43, 55, 49, 60],
  label: "asdasd",
};

export default async function Test() {
  const datas = await getData();
  return (
    <>
      <select name="select" id="" className={classes.select}>
        {datas.map((data: any) => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))}
      </select>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          <Chart title="adasda" chartData={chartInfo} />
        </div>
        <div className={classes.testDiv}>
          <Chart title="adasda" chartData={chartInfo} />
        </div>
        <div className={classes.testDiv}>
          <Chart title="adasda" chartData={chartInfo} />
        </div>
      </div>
    </>
  );
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/exercice", {
    method: "GET",
  });

  return res.json();
}
