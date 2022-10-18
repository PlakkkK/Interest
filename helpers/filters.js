const globalFilters = {
   numberShowCurrencyFormat2DigitsHtml(installment) {
      if (!installment) {
         return "-";
      }
      let dollarUSLocale = Intl.NumberFormat("en-US", {
         minimumFractionDigits: 2,
      });
      return dollarUSLocale.format(parseFloat(installment).toFixed(2));
   },
};
export default globalFilters;

