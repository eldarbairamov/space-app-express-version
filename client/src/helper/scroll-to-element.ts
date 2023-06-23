export const scrollToElement = () => {
   const element = document.getElementById("right_side");
   if (element && window.innerWidth <= 1300) {
      element.scrollIntoView({ behavior: "smooth" });
   }
};
