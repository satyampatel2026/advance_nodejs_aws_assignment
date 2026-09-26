import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 20,
  duration: "1m",
};

export default function () {
  http.get("http://tnplab-alb-1863430641.ap-south-1.elb.amazonaws.com/api/health");
  sleep(1);
}
