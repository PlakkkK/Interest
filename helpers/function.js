const globalFunction = {
   inputNumberAndDot(e) {
      if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode <= 46) {
         e.returnValue = true;
      } else {
         e.returnValue = false;
      }
   },
};
export default globalFunction;
