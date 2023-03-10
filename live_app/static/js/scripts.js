function open_input_disclosure(){
    const input = document.querySelector("#input_disclosure");
    input.click()
}

function btn_back(){
    const main_content = document.querySelector("#content_left");
    const btn_back = document.querySelector("#btn_back");
    const live_chat_div = document.querySelector("#live_content");
    const vote_div = document.querySelector("#bottom_content");

    if(vote_div.style.visibility == 'visible'){
        vote_div.style = "transform: translateY(150%);"
        btn_back.style = "visibility: visible; transform: translateX(-200%);"
        main_content.style = "visibility: visible; transform: translateY(150%);"

        setTimeout(() =>{
            vote_div.style = "visibility: hidden;"
            main_content.style = "visibility: visible; transform: translateY(0%);"
            btn_back.style = "visibility: hidden;"
        }, 500)
    }

    else if(live_chat_div.style.visibility == 'visible'){
        live_chat_div.style = "transform: translateY(150%);"
        btn_back.style = "visibility: visible; transform: translateX(-150%);"
        main_content.style = "visibility: visible; transform: translateY(150%);"

        setTimeout(() =>{
            live_chat_div.style = "visibility: hidden;"
            main_content.style = "visibility: visible; transform: translateY(0%);"
            btn_back.style = "visibility: hidden;"
        }, 500)
    }
}

function open_vote(){
    const main_content = document.querySelector("#content_left");
    const vote_div = document.querySelector("#bottom_content");
    const btn_back = document.querySelector("#btn_back");
    main_content.style = "transform: translateY(150%);"

    setTimeout(() =>{
        main_content.style = "visibility: hidden;"
        vote_div.style = "visibility: visible; transform: translateY(0%);"
        btn_back.style = "visibility: visible; transform: translateX(0%);"
    }, 500)

}

function open_live_chat(){
    const main_content = document.querySelector("#content_left");
    const live_chat_div = document.querySelector("#live_content");
    const btn_back = document.querySelector("#btn_back");
    main_content.style = "transform: translateY(150%);"

    setTimeout(() =>{
        main_content.style = "visibility: hidden;"
        live_chat_div.style = "visibility: visible; transform: translateY(0%);"
        btn_back.style = "visibility: visible; transform: translateX(0%);"
    }, 500)
}