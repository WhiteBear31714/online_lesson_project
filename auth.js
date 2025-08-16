document.addEventListener('DOMContentLoaded', () => {
    const pageCodes = {
        "learns_01.html": "73542",
        "learns_02.html": "18467",
        "learns_03.html": "92051",
        "quiz.html": "65784",
        "survey.html": "31298"
    };

    const externalLinks = {
        "quiz": { code: "65784", url: "https://script.google.com/macros/s/AKfycbwDLJxQq_Y7Lx1Db41mLlhR1AtZpor4MnYqAsGjp8pJbeM8ytnOb6z6U9AUku6Ba4Ei/exec" },
        "survey": { code: "31298", url: "https://forms.gle/1ct99jK3SdWXDNBQ7" }
    };

    const currentPage = window.location.pathname.split("/").pop();
    const params = new URLSearchParams(window.location.search);

    // ✅ กรณี auth.html
    if (currentPage === "auth.html") {
        const type = params.get("type");
        const target = params.get("target");

        // ---- case 1: quiz / survey ----
        if (type && externalLinks[type]) {
            document.querySelector('.auth-card h2').textContent = "กรุณากรอกรหัสเข้าใช้งาน";

            const submitBtn = document.getElementById("submitBtn");
            const codeInput = document.getElementById("accessCode");

            submitBtn.addEventListener("click", () => {
                const inputCode = codeInput.value.trim();
                if (inputCode === externalLinks[type].code) {
                    window.location.href = externalLinks[type].url;
                } else {
                    alert("รหัสไม่ถูกต้อง!");
                }
            });
            return;
        }

        // ---- case 2: target = learns_xx.html ----
        if (target && pageCodes[target]) {
            document.querySelector('.auth-card h2').textContent = "กรุณากรอกรหัสเข้าใช้งานบทเรียน";

            const submitBtn = document.getElementById("submitBtn");
            const codeInput = document.getElementById("accessCode");

            submitBtn.addEventListener("click", () => {
                const inputCode = codeInput.value.trim();
                if (inputCode === pageCodes[target]) {
                    sessionStorage.setItem(target + "_accessCode", inputCode);
                    window.location.href = target;
                } else {
                    alert("รหัสไม่ถูกต้อง!");
                }
            });
            return;
        }

        // ---- ถ้าไม่มีทั้ง type และ target ----
        alert("ไม่พบประเภทลิงก์ที่ต้องการ");
        window.location.href = "main.html";
        return;
    }

    // ✅ กันคนเข้าตรง learns_xx.html โดยไม่ผ่าน auth.html
    const correctCode = pageCodes[currentPage];
    if (correctCode) {
        let enteredCode = sessionStorage.getItem(currentPage + "_accessCode");
        if (!enteredCode || enteredCode !== correctCode) {
            alert("กรุณาเข้าผ่านหน้าป้อนรหัส!");
            window.location.href = "auth.html?target=" + currentPage;
        }
    }
});
