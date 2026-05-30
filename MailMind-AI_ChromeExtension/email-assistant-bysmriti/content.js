console.log("loaded")

const observer = new MutationObserver((mutations) => {

    for (const mutation of mutations) {
        const addNodes = Array.from(mutation.addedNodes);
        const hasComposedElem = addNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh , .btC , [role="dialog"]') || node.querySelector('.aDh , .btC , [role="dialog"]'))
        );

        if (hasComposedElem) {
            console.log("compose wndow");
            setTimeout(injectButton, 500);
        }
    }
});

function injectButton() {

    const existingButton = document.querySelector(".ai-reply-button");
    if (existingButton) existingButton.remove();

    const toolBar = findComposeToolBar();
    if (!toolBar) {
        console.log("toolbar not found");
        return
    }
    const button = createAiButton();
    button.classList.add('ai-reply-button');
    button.addEventListener('click', async () => {

        try {
            button.innerHTML = "Generating..."
            button.disabled = true;
            const emailContent = getEmailContent();
            //  console.log(emailContent)
            const response = await fetch(
                "http://localhost:8080/api/email/generate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailContent,
                        tone: "professional"
                    })
                }
            );
            if (!response.ok) {
                throw new Error("API Request Failed");
            }
            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            console.log(composeBox)
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);

            }
            else {
                console.error("Compose Box was not found");
            }

        } catch (error) {
            console.log(error)
            console.error("Failed to generate Reply")
        } finally {
            button.innerText = "AI Reply";
            button.disabled = false
        }
    });

    toolBar.insertBefore(button, toolBar.firstChild);
}

function getEmailContent() {
    const selectors = [
        '.h7', '.a3s.aiL', '[role = "presentation"] ', '.gmail_quote'
    ]

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return "";
}


function findComposeToolBar() {
    const selectors = [
        '.btC', '.aDh', '[role = "toolbar"] ', '.gU.Up'
    ]

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function createAiButton() {
    const button = document.createElement('div');
    button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
    button.style.marginRight = '8px';
    button.innerText = "AI Reply";
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    return button;
}


observer.observe(document.body, {
    childList: true,
    subtree: true
})