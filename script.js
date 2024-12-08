const apiKey = '7a478d3e930f465f804213efffc3a2cf'
const blogContainer = document.getElementById("blog-container")
const searchField  = document.getElementById("input_search")
const searchBtn = document.getElementById("search_btn")


const fetchRandomNews = async () =>{
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.log(`Error fetching random news ${error}`);
        return []    
    }
}

searchBtn.addEventListener("click", async ()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query", error);
            
        }
    }
})


fetchNewsQuery = async (query) =>{
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.log(`Error fetching random news ${error}`);
        return []    
    }
}


// fetchRandomNews()

function displayBlogs (articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {

        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")

        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement("h2")
        // title.textContent = article.title
        const truncatedTitle = article.title.length >45 ? article.title.slice(0,45) + "..." : article.title;
        title.textContent = truncatedTitle

        const description = document.createElement("p")
        description.textContent = article.description
        // const truncatedDesc = article.description.length >70 ? article.description.slice(0,70) + "...." : article.description;
        // description.textContent = truncatedDesc

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard)
    })();
}



(async () =>{
    try {
        const articles = await fetchRandomNews()
        displayBlogs(articles)      
    } 
    catch (error) {
        console.log(error);    
    }
})()