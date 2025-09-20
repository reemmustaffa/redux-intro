//دي اداه قديمه عشان توصل اي كومبونت بالاستور
import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

//بياخد الـ balance ويعرضه بصيغة عملة حلوة.
function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

//بتحدد أي جزء من البيانات عايزه.
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
