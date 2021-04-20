"use strict";

$(".agreement").click(function () {
  $(".info-new-adv").slideDown(700), $(".product-info").slideDown(700);
  $(".pro-img").slideDown(700);
  $(".product-info").slideDown(700);
  $(".agreement").slideUp();
  $(".pro-contact").slideDown(700);
});
$("#head-bar-click").click(function () {
  $(".side-menu-all").stop().slideDown(700);
});
$("#click-times").click(function () {
  $(".side-menu-all").stop().slideUp(700);
});
var droppable = document.querySelector(".droppable");
var list = document.querySelector(".list");
var ball = document.querySelector(".ball");
var filledBall = document.querySelector(".filled-ball");
var hand = document.querySelector(".hand");
var reader = new FileReader();

var formatBytes = function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return "0 Bytes";
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

var isDragging = 0;
document.addEventListener("dragover", function (e) {
  e.preventDefault();
  isDragging++;
  if (isDragging === 1) droppable.classList.add("is-dragging");
});
document.addEventListener("drop", function (e) {
  e.preventDefault();
  isDragging = 0;
  droppable.classList.remove("is-dragging");
});
list.addEventListener("dragover", function (e) {
  e.preventDefault();
});
var dragtl = gsap.timeline({
  paused: true
});
dragtl.to(ball, {
  duration: 0.4,
  translateX: "286px",
  autoAlpha: 1,
  translateY: "-230px"
}, "drag").to(hand, {
  duration: 0.4,
  transformOrigin: "right",
  rotate: "66deg",
  translateY: "70px",
  translateX: "-20px"
}, "drag");
list.addEventListener("dragenter", function (e) {
  e.preventDefault();
  droppable.classList.add("is-over");
  dragtl.play();
});
list.addEventListener("dragleave", function (e) {
  e.preventDefault();
  droppable.classList.remove("is-over");
  dragtl.reverse();
});
list.addEventListener("drop", function (e) {
  e.preventDefault();
  var sadly = 0;
  var offsetX = e.offsetX,
      offsetY = e.offsetY;
  var files = e.dataTransfer.files;
  reader.readAsDataURL(files[0]);
  reader.addEventListener("load", function () {
    sadly++;
    if (sadly > 1) return;
    itemMarkup(files[0], reader.result, offsetX, offsetY);
  });
  droppable.classList.remove("is-over");
});

var itemMarkup = function itemMarkup(file, url, x, y) {
  var item = document.createElement("div");
  var id = Math.random().toString(36).substr(2, 9);
  item.classList.add("item");
  item.setAttribute("id", id);
  item.innerHTML = "\n    <div class=\"item-img\">\n      <img src=\"".concat(url, "\" />\n    </div>\n    <div class=\"item-details\">\n      <div class=\"item-name\">").concat(file.name, "</div>\n      <div class=\"item-size\">SIZE: ").concat(formatBytes(file.size), "</div>\n    </div>\n    <button class=\"item-delete\" data-id=\"").concat(id, "\"></button>\n");
  list.append(item);
  var itemDeleteBtn = item.querySelector(".item-delete");
  itemDeleteBtn.addEventListener("click", function (e) {
    deleteItem(e);
  });
  var itemImage = item.querySelector(".item-img");
  var imageLeft = itemImage.offsetLeft;
  var imageTop = itemImage.offsetTop;
  var image = document.createElement("div");
  image.classList.add("loaded-image");
  image.innerHTML = "\n    <img src=\"".concat(url, "\" />\n    <span>\n      <svg fill=\"#fff\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 330\">\n        <path d=\"M165 7.5c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15z\"/>\n        <path d=\"M165 262.5c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15z\"/>\n        <path d=\"M315 157.5h-60c-8.284 0-15 6.716-15 15s6.716 15 15 15h60c8.284 0 15-6.716 15-15s-6.716-15-15-15z\"/>\n        <path d=\"M90 172.5c0-8.284-6.716-15-15-15H15c-8.284 0-15 6.716-15 15s6.716 15 15 15h60c8.284 0 15-6.716 15-15z\"/>\n        <path d=\"M281.673 55.827c-5.857-5.858-15.355-5.858-21.213 0l-42.427 42.427c-5.858 5.858-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394 3.839 0 7.678-1.464 10.607-4.394l42.427-42.427c5.858-5.858 5.858-15.355 0-21.213z\"/>\n        <path d=\"M90.753 225.533L48.328 267.96c-5.857 5.858-5.857 15.355 0 21.213 2.929 2.929 6.768 4.393 10.607 4.393 3.839 0 7.678-1.464 10.607-4.393l42.426-42.427c5.857-5.858 5.857-15.355 0-21.213-5.859-5.858-15.356-5.858-21.215 0z\"/>\n        <path d=\"M69.541 55.827c-5.858-5.858-15.355-5.857-21.213 0-5.858 5.858-5.858 15.355 0 21.213l42.426 42.427c2.93 2.929 6.768 4.394 10.607 4.394 3.838 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213L69.541 55.827z\"/>\n      </svg>\n    </span>\n  ");
  list.append(image);
  var progress = 0;
  var tl = gsap.timeline({
    onComplete: function onComplete() {
      image.remove();
      itemImage.style.opacity = 1;
      list.scrollTo(0, list.scrollHeight);
    }
  });
  var itemChildren = item.querySelectorAll("*:not(.item-img)");
  var loadedImg = image.querySelector("img");
  var loadedSVG = image.querySelector("span");
  var iLeft = item.offsetLeft;
  var iTop = item.offsetTop;
  tl.set(droppable, {
    pointerEvents: "none"
  }).fromTo(image, {
    autoAlpha: 1,
    width: 20,
    height: 20,
    x: x - 10,
    y: y - 10,
    borderRadius: "50%"
  }, {
    duration: 0.3,
    width: 70,
    height: 70,
    x: x - 30,
    y: y - 30
  }).to(loadedSVG, {
    autoAlpha: 1,
    duration: 0.4
  }, "loading").to(image, {
    rotation: 720,
    duration: 1.2
  }, "loading").to(loadedSVG, {
    autoAlpha: 0,
    duration: 0.4
  }).to(loadedImg, {
    autoAlpha: 1,
    duration: 0.4
  }, "-=.1").to(image, {
    x: imageLeft,
    y: imageTop,
    duration: 0.8,
    autoAlpha: 1,
    width: 60,
    height: 48,
    borderRadius: 4
  }, "-=.5").set(itemImage, {
    autoAlpha: 1
  }).fromTo(itemChildren, {
    autoAlpha: 0,
    y: 30
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 0.3,
    stagger: 0.06
  }).to(image, {
    autoAlpha: 0,
    duration: 0.3
  }, "-=.2").set(droppable, {
    pointerEvents: "all"
  });
};

var deleteItem = function deleteItem(e) {
  var parent = e.target.parentNode;
  var children = parent.querySelectorAll(":scope > *");
  var deletetl = gsap.timeline({
    onComplete: function onComplete() {
      parent.remove();
      var item = document.querySelector(".item");
      if (!item) dragtl.reverse();
    }
  });
  deletetl.to(children, {
    autoAlpha: 0,
    y: -10,
    duration: 0.2,
    stagger: 0.1
  }).to(parent, {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    duration: 0.5
  }, "-=.15");
};