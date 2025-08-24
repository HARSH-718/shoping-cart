 let MainImg = document.getElementById("MainImg");
    let smallImgs = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallImgs.length; i++) {
      smallImgs[i].onclick = function () {
        MainImg.src = this.src;
      }
    }

    

    // cart 
  
    // Function to update totals
    function updateCartTotal() {
        let rows = document.querySelectorAll(".cart tbody tr");
        let subtotal = 0;

        rows.forEach(row => {
            let price = parseFloat(row.cells[3].innerText.replace("$", ""));
            let qty = row.querySelector("input").value;
            let rowTotal = price * qty;
            row.cells[5].innerText = "$" + rowTotal.toFixed(2);
            subtotal += rowTotal;
        });

        // Update subtotal and total
        document.querySelector(".subtotal table tr:nth-child(1) td:nth-child(2)").innerText = "$" + subtotal.toFixed(2);
        document.querySelector(".subtotal table tr:nth-child(3) td:nth-child(2)").innerText = "$" + subtotal.toFixed(2);
    }

    // Quantity change event
    document.querySelectorAll(".inp").forEach(input => {
        input.addEventListener("change", updateCartTotal);
    });

    // Remove button event
    document.querySelectorAll(".fa-times-circle").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            let row = this.closest("tr");
            row.remove();
            updateCartTotal();
        });
    });

    // Coupon apply
    document.querySelector(".sub-btn").addEventListener("click", function() {
        let code = document.querySelector(".coupan input").value;
        let totalCell = document.querySelector(".subtotal table tr:nth-child(3) td:nth-child(2)");
        let total = parseFloat(totalCell.innerText.replace("$", ""));

        if (code === "HARSH10") {
            let discount = total * 0.1;
            total = total - discount;
            alert("Coupon applied! You saved $" + discount.toFixed(2));
        } else {
            alert("Invalid coupon code!");
        }

        totalCell.innerText = "$" + total.toFixed(2);
    });

    // Initial calculation
    updateCartTotal();
