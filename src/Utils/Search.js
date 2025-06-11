import url from "./Url";

export const handelSearch = async (e, setSearchResult, SearchEmailRef,setLoading) => {
    try {
        if (e.key === "Enter") {
            setLoading(true);
            const email = SearchEmailRef.current.value;
            const response = await fetch(url+"/api/connect/searchUser/" + email, {
                method: "GET",
                credentials: "include"
            })
            if (response.status === 200) {
                const data = await response.json();
                setSearchResult(data)
            }
            SearchEmailRef.current.value = ""
            setLoading(false);
        }
    }
    catch (err) {
        console.log(err);
    }
}