<template>
   <div class="text-center">
      <h4>คำนวณอัตราดอกเบี้ย</h4>
   </div>
   <div class="row m-0">
      <div class="col-md-5">
         <table class="table table-bordered mt-3">
            <thead>
               <tr class="bg-dark text-white">
                  <th class="table-header-center text-right" colspan="2">3 ปีแรก</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td class="text-center font-10">เงินที่ชำระทั้งสิ้น</td>
                  <td class="text-right font-10">{{ $filters.numberShowCurrencyFormatHtml(total_pay_all, "0") }} บาท</td>
               </tr>
               <tr>
                  <td class="text-center font-10">ดอกเบี้ยจ่ายรวม</td>
                  <td class="text-right font-10">{{ $filters.numberShowCurrencyFormat2DigitsHtml(total_interest, "0") }} บาท</td>
               </tr>
               <tr>
                  <td class="text-center font-10">เงินต้นจ่ายรวม</td>
                  <td class="text-right font-10">{{ $filters.numberShowCurrencyFormat2DigitsHtml(total_pay, "0") }} บาท</td>
               </tr>
            </tbody>
         </table>
         <div class="d-flex align-items-center justify-content-between">
            <span>เงินต้น</span>
            <div class="d-flex align-items-center text-right">
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.amount"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>อัตราดอกเบี้ย ปีที่ 1</span>
            <div class="d-flex align-items-center text-right">
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.interest_rate_1"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">% ต่อปี</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>อัตราดอกเบี้ย ปีที่ 2</span>
            <div class="d-flex align-items-center text-right">
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.interest_rate_2"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">% ต่อปี</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>อัตราดอกเบี้ย ปีที่ 3</span>
            <div class="d-flex align-items-center text-right">
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.interest_rate_3"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
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
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.pay_1"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>ปีที่ 2 ยอดผ่อนต่อเดือน</span>
            <div class="d-flex align-items-center text-right">
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.pay_2"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
                  @keypress="inputNumberAndDot($event)"
                  @keyup="changeInput"
               />
               <span class="width-50">บาท</span>
            </div>
         </div>
         <div class="d-flex align-items-center justify-content-between">
            <span>ปีที่ 3 ยอดผ่อนต่อเดือน</span>
            <div class="d-flex align-items-center text-right">
               <CurrencyInput
                  placeholder="0"
                  v-model="fields.pay_3"
                  :options="{ currency: 'USD', currencyDisplay: 'hidden' }"
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
                  <td class="text-right font-10">{{ $filters.numberShowCurrencyFormatHtml(getInterestRate(installment)) }}</td>
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
import CurrencyInput from "./components/CurrencyInput.vue";

export default {
   components: {
      CurrencyInput,
   },
   data() {
      return {
         fields: {
            amount: null,
            interest_rate_1: null,
            interest_rate_2: null,
            interest_rate_3: null,
            pay_1: null,
            pay_2: null,
            pay_3: null,
         },
         table_data: [],
         total_interest: 0,
         total_pay: 0,
         total_pay_all: 0,
      };
   },
   methods: {
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
         this.total_pay_all = 0;
         for (let i = 1; i < 37; i++) {
            if (i <= 12) {
               this.total_pay_all += this.fields.pay_1 ? parseFloat(this.fields.pay_1) : 0;
               if (i == 1) {
                  const interest = (((parseFloat(this.fields.interest_rate_1) * parseFloat(this.fields.amount)) / 100) * 30) / 365;
                  const total = parseFloat(this.fields.pay_1) - interest;
                  const total_amount = parseFloat(this.fields.amount) - total;
                  this.table_data[i] = { amount: this.fields.amount, interest, total, total_amount };
                  this.total_interest += interest || 0;
                  this.total_pay += total || 0;
               } else {
                  const interest = (((parseFloat(this.fields.interest_rate_1) * this.table_data[i - 1].total_amount) / 100) * 30) / 365;
                  const total = parseFloat(this.fields.pay_1) - interest;
                  const total_amount = this.table_data[i - 1].total_amount - total;
                  this.table_data[i] = { amount: this.table_data[i - 1].total_amount, interest, total, total_amount };
                  this.total_interest += interest || 0;
                  this.total_pay += total || 0;
               }
            } else if (i > 12 && i <= 24) {
               this.total_pay_all += this.fields.pay_2 ? parseFloat(this.fields.pay_2) : 0;
               const interest = (((parseFloat(this.fields.interest_rate_2) * this.table_data[i - 1].total_amount) / 100) * 30) / 365;
               const total = parseFloat(this.fields.pay_2) - interest;
               const total_amount = this.table_data[i - 1].total_amount - total;
               this.table_data[i] = { amount: this.table_data[i - 1].total_amount, interest, total, total_amount };
               this.total_interest += interest || 0;
               this.total_pay += total || 0;
            } else if (i > 24 && i <= 36) {
               this.total_pay_all += this.fields.pay_3 ? parseFloat(this.fields.pay_3) : 0;
               const interest = (((parseFloat(this.fields.interest_rate_3) * this.table_data[i - 1].total_amount) / 100) * 30) / 365;
               const total = parseFloat(this.fields.pay_3) - interest;
               const total_amount = this.table_data[i - 1].total_amount - total;
               this.table_data[i] = { amount: this.table_data[i - 1].total_amount, interest, total, total_amount };
               this.total_interest += interest || 0;
               this.total_pay += total || 0;
            }
         }
      },
      inputNumberAndDot(e) {
         if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 46) {
            e.returnValue = true;
         } else {
            e.returnValue = false;
         }
      },
   },
};
</script>

<style scoped></style>
