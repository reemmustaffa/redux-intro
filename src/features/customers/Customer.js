import { useSelector } from "react-redux";

function Customer() {
  //دي موجوده عشان اشترك في الريدكس واقدر يكون ليا اكسس عليه
  const customer = useSelector((store) => store.customer);

  console.log(customer);
  return <h2>👋 Welcome, %NAME%</h2>;
}

export default Customer;
