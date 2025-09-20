import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//معالجة الـ state بشكل مباشر (mutating) عادي، وده ممكن لإن Toolkit بيستعمل مكتبة Immer تحت الغطا → بتحوّل التغييرات دي إلى نسخة جديدة immutable.

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      //prepare: دالة بتجهّز الـ payload قبل ما يوصل للـ reducer.
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      //reducer: الدالة اللي بتعدّل الـ state.
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanPurpose: "",
//       };
//     case "convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") {
//     return { type: "account/deposit", payload: amount };
//   }

//   return async function (dispatch, getStete) {
//     dispatch({ type: "convertingCurrency" });
//     //API CALL (middle ware)

//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();

//     const converted = data.rates.USD;

//     //return action after middleware
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
