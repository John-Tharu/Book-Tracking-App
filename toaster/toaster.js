let toastBox = document.getElementById("toastBox");
        let successMsg = `<i class="fa-solid fa-circle-check"></i> Successfully Submitted!`;
        let errorMsg = '<i class="fa-solid fa-circle-xmark"></i> Error! Please try again.';
        let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid! Please check your input.';

        export function showToast(msg){
            let toast = document.createElement("div");
            toast.classList.add("toast");
            toast.innerHTML = msg;
            toastBox.appendChild(toast);

            if(msg.includes("Error")){
                toast.classList.add("error");
            }
            if(msg.includes("Invalid")){
                toast.classList.add("invalid");
            }

            setTimeout(() => {
                toast.remove();
            }, 5000);
        }