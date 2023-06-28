function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";
  
  while (switching) {
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

var headers = document.querySelectorAll("#myTable th");
var activeIndex = 1;
var table = document.querySelector(".table")

headers.forEach(function(header, index) {
  header.addEventListener("click", function() {

    this.classList.toggle("sorting");

    headers.forEach(function(otherHeader) {
      if (otherHeader !== header) {
        otherHeader.classList.remove("sorting");
      }
    });

    sortTable(index);
  });
});
function switchActiveClass() {
  table.scrollTo({ left: 0, behavior: "smooth" });
  headers[activeIndex].classList.remove("active");
  
  if (this.id === "nextBtn") {
    activeIndex = (activeIndex + 1) % headers.length;
  } else if (this.id === "prevBtn") {
    activeIndex = (activeIndex - 1 + headers.length) % headers.length;
  }
  headers[activeIndex].classList.add("active");
  
  
  if (activeIndex > 0) {
    const previousItems = Array.from(headers).slice(0, activeIndex); // Get the items before the active element
    
    let totalWidth = 0;

    previousItems.forEach(item => {
      const width = item.offsetWidth; 
      totalWidth += width;
    });

    var scrollLeft = totalWidth - headers[0].offsetWidth;
    table.scrollTo({ left: scrollLeft, behavior: "smooth" });
 
  }

  table.addEventListener('scroll', function() {
    if (table.scrollLeft === 0) {
      prevBtn.disabled = true;
    } else if (table.scrollLeft + table.clientWidth >= table.scrollWidth) {
      nextBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
  });
  
}

var nextBtn = document.getElementById("nextBtn");
var prevBtn = document.getElementById("prevBtn");
nextBtn.addEventListener("click", switchActiveClass);
prevBtn.addEventListener("click", switchActiveClass);


prevBtn.disabled = true;

