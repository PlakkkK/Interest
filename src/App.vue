<template>
   <div class="row m-0">
      <div class="col-md-5">
         <div class="d-flex align-items-center justify-content-between">
            <span>เงินต้น</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.amount"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>อัตราดอกเบี้ย ปีที่ 1</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.interest_rate_1"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">% ต่อปี</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>อัตราดอกเบี้ย ปีที่ 2</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.interest_rate_2"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">% ต่อปี</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>อัตราดอกเบี้ย ปีที่ 3</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.interest_rate_3"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">% ต่อปี</span>
            </div>
         </div>
         <br />
         <div class="d-flex align-items-center justify-content-between">
            <span>ปีที่ 1 ยอดผ่อนต่อเดือน</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.pay_1"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>ปีที่ 2 ยอดผ่อนต่อเดือน</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.pay_2"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>ปีที่ 3 ยอดผ่อนต่อเดือน</span>
            <div class="d-flex align-items-center text-right">
               <input
                  type="text"
                  class="form-control text-right input-border-0"
                  placeholder="0"
                  v-model="fields.pay_3"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
      </div>
      <div class="col-md-7">
         <table class="table table-bordered mt-3">
            <thead>
               <tr class="bg-dark text-white">
                  <th class="table-header-center" width="10%">งวดที่</th>
                  <th class="table-header-center" width="20%">เงินต้น</th>
                  <th class="table-header-center" width="15%">จำนวนเงินที่ต้องชำระ</th>
                  <th class="table-header-center" width="15%">จ่ายดอกเบี้ย</th>
                  <th class="table-header-center" width="15%">หักเงินต้น</th>
                  <th class="table-header-center" width="20%">ยอดเงินต้นคงเหลือ</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="installment in 36" :key="installment">
                  <td class="text-center font-10">{{ installment }}</td>
                  <td class="text-right font-10">
                     {{ $filters.numberShowCurrencyFormat2DigitsHtml(table_data[installment] ? table_data[installment].amount : 0) }}
                  </td>
                  <td class="text-right font-10">{{ $filters.numberShowCurrencyFormat2DigitsHtml(getInterestRate(installment)) }}</td>
                  <td class="text-right font-10">
                     {{ $filters.numberShowCurrencyFormat2DigitsHtml(table_data[installment] ? table_data[installment].interest : 0) }}
                  </td>
                  <td class="text-right font-10">
                     {{ $filters.numberShowCurrencyFormat2DigitsHtml(table_data[installment] ? table_data[installment].total : 0) }}
                  </td>
                  <td class="text-right font-10">
                     {{ $filters.numberShowCurrencyFormat2DigitsHtml(table_data[installment] ? table_data[installment].total_amount : 0) }}
                  </td>
               </tr>
               <tr>
                  <td class="text-right font-10 text-danger fw-semibold" colspan="4">{{ $filters.numberShowCurrencyFormat2DigitsHtml(total_interest) }}</td>
                  <td class="font-10 text-success fw-semibold" colspan="2">{{ $filters.numberShowCurrencyFormat2DigitsHtml(total_pay) }}</td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
   <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script>
export default {
   data() {
      return {
         fields: {
            amount: "",
            interest_rate_1: "",
            interest_rate_2: "",
            interest_rate_3: "",
            pay_1: "",
            pay_2: "",
            pay_3: "",
         },
         table_data: [],
         total_interest: 0,
         total_pay: 0,
      };
   },
   methods: {
      genAmount(installment) {
         console.log(installment);
         if (installment == 1) {
            return this.fields.amount;
         }
      },
      getInterestRate(installment) {
         if (installment <= 12) {
            return this.fields.pay_1;
         } else if (installment > 12 && installment <= 24) {
            return this.fields.pay_2;
         } else if (installment > 24 && installment <= 36) {
            return this.fields.pay_3;
         }
      },
      changeInput() {
         this.total_interest = 0;
         this.total_pay = 0;
         for (let i = 1; i < 37; i++) {
            if (i <= 12) {
               if (i == 1) {
                  const interest = (((this.fields.interest_rate_1 * this.fields.amount) / 100) * 30) / 365;
                  const total = this.fields.pay_1 - interest;
                  const total_amount = this.fields.amount - total;
                  this.table_data[i] = { amount: this.fields.amount, interest, total, total_amount };
                  this.total_interest += interest;
                  this.total_pay += total;
               } else {
                  const interest = (((this.fields.interest_rate_1 * this.table_data[i - 1].total_amount) / 100) * 30) / 365;
                  const total = this.fields.pay_1 - interest;
                  const total_amount = this.table_data[i - 1].total_amount - total;
                  this.table_data[i] = { amount: this.fields.amount, interest, total, total_amount };
                  this.total_interest += interest;
                  this.total_pay += total;
               }
            } else if (i > 12 && i <= 24) {
               const interest = (((this.fields.interest_rate_2 * this.table_data[i - 1].total_amount) / 100) * 30) / 365;
               const total = this.fields.pay_2 - interest;
               const total_amount = this.table_data[i - 1].total_amount - total;
               this.table_data[i] = { amount: this.fields.amount, interest, total, total_amount };
               this.total_interest += interest;
               this.total_pay += total;
            } else if (i > 24 && i <= 36) {
               const interest = (((this.fields.interest_rate_3 * this.table_data[i - 1].total_amount) / 100) * 30) / 365;
               const total = this.fields.pay_3 - interest;
               const total_amount = this.table_data[i - 1].total_amount - total;
               this.table_data[i] = { amount: this.fields.amount, interest, total, total_amount };
               this.total_interest += interest;
               this.total_pay += total;
            }
         }
      },
      calInterest(installment) {
         //  if (installment <= 12) {
         //     if (installment == 1) {
         //        return (((this.fields.interest_rate_1 * this.fields.amount) / 100) * 30) / 365;
         //     }
         //  } else if (installment > 12 && installment <= 24) {
         //     // return this.fields.pay_2;
         //  } else if (installment > 24 && installment <= 36) {
         //     // return this.fields.pay_3;
         //  }
         if (installment <= 12) {
            if (installment == 1) {
               return this.fields.pay_1 - (((this.fields.interest_rate_1 * this.fields.amount) / 100) * 30) / 365;
            }
         } else if (installment > 12 && installment <= 24) {
            // return this.fields.pay_2;
         } else if (installment > 24 && installment <= 36) {
            // return this.fields.pay_3;
         }
      },
      getTotal(installment) {
         if (installment <= 12) {
            if (installment == 1) {
               return this.fields.pay_1 - (((this.fields.interest_rate_1 * this.fields.amount) / 100) * 30) / 365;
            }
            // this.table_data[installment].
         } else if (installment > 12 && installment <= 24) {
            // return this.fields.pay_2;
         } else if (installment > 24 && installment <= 36) {
            // return this.fields.pay_3;
         }
      },
      getTotalAmount(installment) {
         if (installment <= 12) {
            if (installment == 1) {
               return this.fields.amount - (this.fields.pay_1 - (((this.fields.interest_rate_1 * this.fields.amount) / 100) * 30) / 365);
            }
         } else if (installment > 12 && installment <= 24) {
            // return this.fields.pay_2;
         } else if (installment > 24 && installment <= 36) {
            // return this.fields.pay_3;
         }
      },
      inputNumberAndDot(e) {
         if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode <= 46) {
            e.returnValue = true;
         } else {
            e.returnValue = false;
         }
      },
   },
};
</script>

<style scoped></style>
