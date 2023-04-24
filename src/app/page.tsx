import Chart from "../components/Chart";
import classes from "./index.module.scss";

const chartInfo = {
  labels: ["January", "February", "March", "April", "May", "June"],
  data: [33, 50, 43, 55, 49, 60],
  label: "asdasd",
};

export default async function Test() {
  return (
    <>
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