const globalFilters = {
   numberShowCurrencyFormatHtml(value, defalut) {
      if (!value) {
         return defalut || "-";
      }
      let dollarUSLocale = Intl.NumberFormat("en-US");
      return dollarUSLocale.format(parseFloat(value));
   },
   numberShowCurrencyFormat2DigitsHtml(value, defalut) {
      if (!value) {
         return defalut || "-";
      }
      let dollarUSLocale = Intl.NumberFormat("en-US", {
         minimumFractionDigits: 2,
      });
      return dollarUSLocale.format(parseFloat(value).toFixed(2));
   },
};
export default globalFilters;
