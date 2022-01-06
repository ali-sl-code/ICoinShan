/** @format */

//! Components start
//* Search component start
function search(items, searchParam, q) {
  return items.filter((item) => {
    return searchParam.some((newItem) => {
      return (
        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    })
  })
}
//* Search component start

//* Logo component start
function Logo(props) {
  return (
    <div className="logo w-48 animate__animated animate__slideInDown animate__delay-2s">
      <a href={props.href}>
        <img src={props.src} alt="Logo" className="w-full" />
      </a>
    </div>
  )
}
//* Logo component end

//* Header JSX code start
function Header(props) {
  const [isHidden, setIsHidden] = React.useState(true)

  return (
    <header className="flex md:flex-row flex-nowrap items-center md:justify-between justify-around flex-col bg-blue shadow-lg shadow-dark-blue md:h-20 h-48 px-8">
      <Logo href="/index.htm" src="./images/logo.png" />

      <div className="search-bar w-96 h-9 relative">
        <span className="absolute top-[7.5px] left-[7px] z-50">
          <i className="fas fa-search text-gray"></i>
        </span>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input absolute top-0 bottom-0 w-full pl-7 outline-none text-[18px] border-solid border-[1px] border-gray rounded-md"
          placeholder="Search..."
          value={props.q}
          // onChange={ (e) => setQ(e.target.value) }
          onChange={(e) => props.setQ(e.target.value)}
        />
      </div>

      <div className="order relative">
        {/* <button type="button">{ props.order == "row" ? <i className="fas fa-grip-horizontal"></i> : <i className="fas fa-th-list"></i> }</button> */}
        <button
          type="button"
          id="orderBtn"
          className="md:w-[40px] md:block hidden h-[40px] border-[1px] border-dark-blue rounded-md bg-light-primary/70"
          onClick={() => setIsHidden(isHidden ? false : true)}
        >
          {props.order == "post" ? (
            <i className="fas fa-grip-horizontal text-white text-[22px]"></i>
          ) : (
            <i className="fas fa-th-list text-white text-[22px]"></i>
          )}
        </button>
        <div
          id="order"
          className={`absolute top-[45px] right-0 md:w-[160px] w-96 border-[1px] border-dark-blue rounded-md bg-light-primary/70 z-50 ${
            isHidden ? "hidden" : "block"
          }`}
        >
          <div
            className="post flex flex-row items-center px-[10px] w-full text-white h-[40px] transition-[0.5s] hover:bg-dark-blue cursor-pointer"
            onClick={(e) => {
              setIsHidden(true)
              props.setOrder("post")
            }}
          >
            <i className="fas fa-grip-horizontal"></i>
            <span className="order-option ml-[10px]">Post</span>
          </div>
          <div
            className="row flex flex-row items-center px-[10px] w-full text-white h-[40px] transition-[0.5s] hover:bg-dark-blue cursor-pointer"
            onClick={(e) => {
              setIsHidden(true)
              props.setOrder("row")
            }}
          >
            <i className="fas fa-th-list"></i>
            <span className="order-option ml-[10px]">Row</span>
          </div>
        </div>
      </div>
    </header>
  )
}
//* Header JSX code end

//* Create new Post component code start
const post = (value, index) => {
  return (
    <div
      className="post border-[1px] border-dark-blue rounded-md bg-light-primary/70 py-[20px] px-[30px] mx-[15px] my-[20px] w-[423px] min-w-[300px] relative shadow-lg shadow-dark-blue hover:shadow-2xl transition-shadow wow animate__animated animate__fadeIn"
      key={value.id}
    >
      <div className="flex - flex-row items-center justify-start mb-[10px]">
        <img
          src={`https://cryptologos.cc/logos/${
            value.id
          }-${
            value.symbol.toLowerCase()
          }-logo.svg`}
          className="w-[40px] h-[40px] mr-2"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="./images/404.png";
          }}
        />
        <h1 className="coin-name text-[24px] text-white font-semibold">
          {value.name}
        </h1>
      </div>
      <div className="coin-volume text-[16px] text-light">
        Volume:{" "}
        <span className="text-[15px] text-light-gray">
          {Number.parseFloat(value.volumeUsd24Hr).toFixed(3)}
        </span>
      </div>
      <div className="coin-symbol text-[16px] text-light">
        Symbol:{" "}
        <span className="text-[15px] text-light-gray">{value.symbol}</span>
      </div>
      <div className="coin-price text-[16px] text-light">
        Price:{" "}
        <span className="text-[15px] text-light-gray">
          {Number.parseFloat(value.priceUsd).toFixed(5)} $
        </span>
      </div>
      <div className="coin-supply text-[16px] text-light">
        Supply:{" "}
        <span className="text-[15px] text-light-gray">
          {Number.parseFloat(value.supply).toFixed(2)}{" "}
          {value.maxSupply != null &&
            `max: ${Number.parseFloat(value.maxSupply).toFixed(2)}`}
        </span>
      </div>
      <a
        href={value.explorer}
        target="_blank"
        className="block bg- text-center text-[16px] mt-[25px] border-[1px] border-solid border-light-gray rounded-sm py-[2px] transition-[1s] text-light-gray hover:text-light-primary hover:bg-light-gray"
      >
        View
      </a>
      <a
        href={`https://www.coinex.com/info/${value.symbol}`}
        target="_blank"
        className="flex flex-row items-center justify-center text-center text-[16px] mt-[10px] border-[1px] border-solid border-light-gray rounded-sm py-[2px] transition-[1s] text-light-gray hover:text-light-primary hover:bg-light-gray"
      >
        <span>View on</span>
        <img
          src="./images/coinex.svg"
          alt="CoinEx"
          className="w-[20px] h-[20px] ml-1"
        />
      </a>
      <span className="coin-rank absolute flex items-center justify-center w-[30px] h-[30px] top-[5px] right-[10px] text-rank font-semibold border-[1px] border-solid border-rank rounded-full">
        {value.rank}
      </span>
    </div>
  )
}

const postRow = (value, index) => {
  return (
    <div className="post-row w-full" key={value.id}>
      <a
        href={value.explorer}
        target="_blank"
        className="w-full flex flex-row items-center justify-start border-[1px] border-dark-blue rounded-md bg-light-primary/70 my-[10px] px-[25px] py-[20px] relative shadow-lg shadow-dark-blue wow animate__animated animate__fadeIn"
      >
        <h1 className="coin-name text-[22px] text-white mr-[25px] font-semibold">
          {value.name}
        </h1>
        <div className="coin-symbol text-light text-[16px] mr-[12px]">
          Symbol:{" "}
          <span className="text-light-gray text-[14px]">{value.symbol}</span>
        </div>
        <div className="coin-price text-light text-[16px] mr-[12px]">
          Price:{" "}
          <span className="text-light-gray text-[14px]">
            ${Number.parseFloat(value.priceUsd).toFixed(3)}
          </span>
        </div>
        <div className="coin-supply text-light text-[16px]">
          Supply:{" "}
          <span className="text-light-gray text-[14px]">
            {Number.parseFloat(value.supply).toFixed(2)}{" "}
            {value.maxSupply != null &&
              `max: ${Number.parseFloat(value.maxSupply).toFixed(2)}`}
          </span>
        </div>
        <span className="coin-rank absolute flex items-center justify-center w-[30px] h-[30px] top-[22px] right-[15px] text-rank font-semibold border-[1px] border-solid border-rank rounded-full">
          {value.rank}
        </span>
      </a>
    </div>
  )
}
//* Create new Post component code end

//* Posts JSX code start
function Main(props) {
  const [error, setError] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  let requestOptions = {
    method: "GET",
    redirect: "follow",
  }

  React.useEffect(() => {
    fetch("https://api.coincap.io/v2/assets", requestOptions)
      .then((res) => res.json())
      .then(
        (res) => {
          props.setData(res)
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded || props.data["data"] == undefined) {
    return <div>Loading...</div>
  } else {
    let mainTagClassList = [
      "coins",
      "sm:py-[40px]",
      "sm:px-[80px]",
      "flex",
      "px-[30px]",
      "py-[20px]",
    ]

    if (props.order == "post") {
      mainTagClassList.push(
        "flex-row",
        "flex-wrap",
        "items-center",
        "justify-center"
      )
    } else {
      mainTagClassList.push(
        "flex-col",
        "flex-wrap",
        "items-center",
        "justify-start"
      )
    }
    return (
      <main className={mainTagClassList.join(" ")}>
        {props.order == "post" &&
          props
            .search(props.data["data"], props.searchParam, props.q)
            .map((value, index) => props.post(value, index))}
        {props.order == "row" &&
          props
            .search(props.data["data"], props.searchParam, props.q)
            .map((value, index) => props.postRow(value, index))}
      </main>
    )
  }
}
//* Posts JSX code end

//* Footer JSX code start
function Footer(props) {
  return (
    <footer className="footer w-full pb-[30px]">
      <p className=" text-white text-[26px] text-center">
        {"Powered By ↝"} {props.owner} {"♥"}
      </p>
    </footer>
  )
}
//* Footer JSX code end
//! Components end

//! App component
function App(props) {
  const [data, setData] = React.useState({})
  const [q, setQ] = React.useState("")
  const [searchParam] = React.useState(["name", "symbol"])
  const [order, setOrder] = React.useState("post")

  return (
    <>
      <Header setQ={setQ} q={q} order={order} setOrder={setOrder} />
      <Main
        data={data}
        setData={setData}
        post={post}
        postRow={postRow}
        q={q}
        search={search}
        searchParam={searchParam}
        order={order}
      />
      <Footer owner="Ali Soleimani" />
    </>
  )
}

//! Render app
ReactDOM.render(<App />, document.getElementById("root"))
