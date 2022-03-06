window.addEventListener('load', () => {

    const ino = sessionStorage.getItem('INO');
    const date = sessionStorage.getItem('DATE');
    const qty = sessionStorage.getItem('QTY');
    const rate = sessionStorage.getItem('RATE');

    var ans = parseFloat((qty * rate).toFixed(2));
    var gst = parseFloat(((ans * 2.50) / 100).toFixed(2));
    var gtotalworo = parseFloat((ans + 2 * gst));
    var gtotal = Math.round(gtotalworo);
    var roundoffvalue = gtotal - ans - gst - gst;

    console.log('Ans:', ans);
    console.log('gst:', gst);
    console.log('gtotalworo:', gtotalworo);
    console.log('gtotal:', gtotal);
    console.log('roundoffvalue:', roundoffvalue);

    //  console.log(ans)


    document.getElementById('ino').innerHTML = ino;
    document.getElementById('date').innerHTML = date;
    document.getElementById('qty').innerHTML = qty;
    document.getElementById('rate').innerHTML = rate;
    document.getElementById('amount').innerHTML = ans;
    document.getElementById('total').innerHTML = ans;
    document.getElementById('cgst').innerHTML = gst;
    document.getElementById('sgst').innerHTML = gst;
    //  document.getElementById('grandtotalworo').innerHTML = gtotalworo;
    document.getElementById('grandtotalwro').innerHTML = gtotal;
    document.getElementById('roundoff').innerHTML = roundoffvalue.toFixed(2);

    const num = gtotal;
    const wordify = (num) => {
        const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const formatTenth = (digit, prev) => {
            return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
        };
        const formatOther = (digit, next, denom) => {
            return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
        };
        let res = "";
        let index = 0;
        let digit = 0;
        let next = 0;
        let words = [];
        if (num += "", isNaN(parseInt(num))) {
            res = "";
        } else if (parseInt(num) > 0 && num.length <= 10) {
            for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
                case 0:
                    words.push(formatOther(digit, next, ""));
                    break;
                case 1:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 2:
                    words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
                    break;
                case 3:
                    words.push(formatOther(digit, next, "Thousand"));
                    break;
                case 4:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 5:
                    words.push(formatOther(digit, next, "Lakh"));
                    break;
                case 6:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 7:
                    words.push(formatOther(digit, next, "Crore"));
                    break;
                case 8:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 9:
                    words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
            };
            res = words.reverse().join("")
        } else res = "";
        return res
    };
    let gtotalinwords = wordify(num);
    document.getElementById('gtotalinwords').innerHTML = gtotalinwords;
})


window.onload = function() {
    document.getElementById("download")
        .addEventListener("click", () => {
            const invoice = this.document.getElementById("invoice");
            console.log(invoice);
            console.log(window);
            const ino = sessionStorage.getItem('INO');
            const date = sessionStorage.getItem('DATE');

            document.getElementById('ino').innerHTML = ino;
            document.getElementById('date').innerHTML = date;
            var opt = {
                margin: 1,
                filename: 'GANPATI BASTRAM Date: ' + date + ' Invoice No: ' + ino + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        })
}
