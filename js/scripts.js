/* Business-side logic: functions to calculate angle measurments given triangle side lengths */

/* A function to square a number, probably not necessary but here it is anyway. */
var sqr = function(x) {
  square = x * x;
  return square;
};

/* Calculate the angle (in radians) of a triangle given the lengths of the three sides, where a and b are the lengths of the sides that intersect in the angle to be found, and c is the length of the opposite side. Ex: given the right triangle ABC, where side A is length 3, side B is length 4, and side C, the hypotenuse, is length 5, angleAB(3,4,5) = pi/2. */
var findAngle = function(a,b,c) {
  numerator = sqr(a) + sqr(b) - sqr(c);
  denom = 2*a*b;
  arg = numerator / denom;
  result = Math.acos(arg);
  return result;
};

/* Convert an angle given in radians to degrees. */
var radToDeg = function(x) {
  var pi = Math.PI;
  return x * (180/pi);
}







/* User-interface logic */

$(document).ready(function() {
  $("form#input").submit(function(event) {
    event.preventDefault();
    var side1 = parseFloat($("#side1").val());
    var side2 = parseFloat($("#side2").val());
    var side3 = parseFloat($("#side3").val());
    var sideArray = [side1, side2, side3];
    sideArray = sideArray.sort(function(a,b){return a-b});
    side1 = sideArray[0];
    side2 = sideArray[1];
    side3 = sideArray[2];

    var triangleType = "";
    if (side3 <= side1 + side2) {
      triangleType = "scalene";
    } else if (side1 === side2 && side2 === side3) {
      triangleType = "equilateral";
    } else if (side1 === side2 || side2 === side3 || side1 === side3) {
      triangleType = "isosceles";
    } else {
      triangleType = "not a triangle";
    };

    if (triangleType != "not a triangle") {
      var angleAB = radToDeg(findAngle(side1, side2, side3)).toFixed(3);
      var angleBC = radToDeg(findAngle(side2, side3, side1)).toFixed(3);
      var angleAC = radToDeg(findAngle(side1, side3, side2)).toFixed(3);
      console.log(angleAB, angleBC, angleAC);
    };

    $("#side-A-len").text(side1);
    $("#side-B-len").text(side2);
    $("#side-C-len").text(side3);

    $("#angle-AB").text(angleAB);
    $("#angle-BC").text(angleBC);
    $("#angle-AC").text(angleAC);

    if (triangleType === "not a triangle") {
      $(".not-a-triangle").show();
      $(".triangle-output").hide();
      $(".triangle-output-equilateral").hide();
      $(".triangle-output-isosceles").hide();
      $(".triangle-output-scalene").hide();
    } else if (triangleType === "equilateral") {
      $(".not-a-triangle").hide();
      $(".triangle-output").show();
      $(".triangle-output-equilateral").show();
      $(".triangle-output-isosceles").hide();
      $(".triangle-output-scalene").hide();
    } else if (triangleType === "isosceles") {
      $(".not-a-triangle").hide();
      $(".triangle-output").show();
      $(".triangle-output-equilateral").hide();
      $(".triangle-output-isosceles").show();
      $(".triangle-output-scalene").hide();
    } else if (triangleType === "scalene") {
      $(".not-a-triangle").hide();
      $(".triangle-output").show();
      $(".triangle-output-equilateral").hide();
      $(".triangle-output-isosceles").hide();
      $(".triangle-output-scalene").show();
    };
  });
});
