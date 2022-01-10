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
      <Logo href="/index.htm" src="./images/logo-darktheme.webp" />

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
          <i
            className={`${
              props.order == "post"
                ? "fas fa-grip-horizontal"
                : "fas fa-th-list"
            } text-white text-[22px]`}
          ></i>
          {/* {props.order == "post" ? (
            <i className="fas fa-grip-horizontal text-white text-[22px]"></i>
          ) : (
            <i className="fas fa-th-list text-white text-[22px]"></i>
          )} */}
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

//! Post content code start
//* Post component info JSX code start
function PostInfo({value}) {
  let isGrowing = true
  let changePercent24HrClassList = [
    // "absolute",
    "items-center",
    "justify-center",
    "px-2",
    "py-1",
    // "top-[5px]",
    // "right-[10px]",
    "font-semibold",
    // "border-[1px]",
    // "border-solid",
    // "rounded-full",
  ]

  if (value.changePercent24Hr.charAt(0) == "-") {
    changePercent24HrClassList.push("text-damage")
    isGrowing = false
    // changePercent24HrClassList.push("text-damage border-damage")
  } else {
    changePercent24HrClassList.push("text-profit")
    // changePercent24HrClassList.push("text-profit border-profit")
  }

  return (
    <>
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
        <span className={changePercent24HrClassList.join(" ")}>
          {isGrowing ? (
            <i className="fas fa-caret-up mx-1"></i>
          ) : (
            <i className="fas fa-caret-down mx-1"></i>
          )}
          {Number.parseFloat(value.changePercent24Hr).toFixed(2)}%
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
        className="block text-center text-[16px] mt-[25px] border-[1px] border-solid border-light-gray rounded-sm py-[2px] transition-[1s] text-light-gray hover:text-light-primary hover:bg-light-gray"
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
    </>
  )
}
//* Post component info JSX code end

//* Post component chart code start
function PostChart(props) {
  const [times, setTimes] = React.useState(undefined)
  const [prices, setPrices] = React.useState(undefined)
  const [error, setError] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    fetch(
      `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${props.symbol}&tsym=USD&limit=${props.limit}&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146`
    )
      .then((res) => res.json())
      .then(
        (res) => {
          const data = res.Data.Data
          setTimes(data.map((obj) => obj.time))
          setPrices(data.map((obj) => obj.high))
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    console.log("error", error)
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center my-5">
        <div className="loading w-16 h-16 border-4 border-light border-solid rounded-full animate-spin"></div>
      </div>
    )
  } else {
    return (
      <Line
        datasetIdKey={props.symbol}
        data={{
          labels: times,
          datasets: [
            {
              label: "$",
              data: prices,
              backgroundColor: "rgba(118,106,192,1)",
              borderColor: "rgba(118,106,192,1)",
              borderJoinStyle: "round",
              borderCapStyle: "round",
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 10,
              lineTension: 0.2,
            },
          ],
        }}
        option={{
          responsive: true,
        }}
      />
    )
  }
}
//* Post component chart code end
//! Post content code end

//* Create new Post component code start
// const post = (value, index) => {
function Post({value, index}) {
  const [chart, setChart] = React.useState(false)

  const coinLogoSrc = (id, symbol) => {
    return `https://cryptologos.cc/logos/${id}-${symbol.toLowerCase()}-logo.svg`
  }
  // let coinLogoSrc = `https://cryptologos.cc/logos/${
  //   value.id
  // }-${value.symbol.toLowerCase()}-logo.svg`

  return (
    <div
      className="post border-[1px] border-dark-blue rounded-md bg-light-primary/70 py-[20px] px-[30px] mx-[15px] my-[20px] w-[423px] min-w-[300px] relative shadow-lg shadow-dark-blue hover:shadow-2xl transition-shadow wow animate__animated animate__fadeIn"
      key={value.id}
    >
      <div className="flex flex-row items-center justify-between mb-[15px]">
        <div className="flex flex-row items-center justify-start">
          <a href={coinLogoSrc(value.id, value.symbol)} target="_blank">
            <img
              src={coinLogoSrc(value.id, value.symbol)}
              className="w-[40px] h-[40px] mr-2"
              onError={({currentTarget}) => {
                currentTarget.onerror = null
                currentTarget.src = "./images/404.png"
              }}
            />
          </a>
          <h1 className="coin-name text-[24px] text-white font-semibold">
            {value.name}
          </h1>
        </div>
        <button
          className=" text-[16px] py-[5px] px-[10px] flex items-center justify-center border-[1px] border-solid border-light-gray rounded-sm transition-[1s] text-light-gray hover:text-light-primary hover:bg-light-gray"
          data-symbol={value.symbol}
          onClick={() => setChart(!chart)}
        >
          <i className="fas fa-chart-line"></i>
        </button>
      </div>
      {chart ? (
        <PostChart symbol={value.symbol} limit="19" />
      ) : (
        <PostInfo value={value} />
      )}
    </div>
  )
}

// const postRow = (value, index) => {
function PostRow({value, index}) {
  const [chart, setChart] = React.useState(false)

  let isGrowing = true
  let changePercent24HrClassList = [
    // "absolute",
    "items-center",
    "justify-center",
    "px-2",
    "py-1",
    // "top-[5px]",
    // "right-[10px]",
    "font-semibold",
    // "border-[1px]",
    // "border-solid",
    // "rounded-full",
  ]

  if (value.changePercent24Hr.charAt(0) == "-") {
    changePercent24HrClassList.push("text-damage")
    isGrowing = false
    // changePercent24HrClassList.push("text-damage border-damage")
  } else {
    changePercent24HrClassList.push("text-profit")
    // changePercent24HrClassList.push("text-profit border-profit")
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-between border-[1px] border-dark-blue rounded-md bg-light-primary/70 my-[10px] px-[25px] py-[20px] relative shadow-lg shadow-dark-blue cursor-pointer wow animate__animated animate__fadeIn"
      key={value.id}
      onClick={() => setChart(!chart)}
    >
      <div
        className={`flex flex-row items-center justify-between self-start ${
          chart ? "mb-5" : ""
        }`}
      >
        <div className="flex flex-row items-center justify-start">
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
        </div>
        <div>
          <span className={changePercent24HrClassList.join(" ")}>
            {isGrowing ? (
              <i className="fas fa-caret-up mx-1"></i>
            ) : (
              <i className="fas fa-caret-down mx-1"></i>
            )}
            {Number.parseFloat(value.changePercent24Hr).toFixed(2)}%
          </span>
        </div>
      </div>
      {chart && <PostChart symbol={value.symbol} limit="99" />}
    </div>
  )
}
//* Create new Post component code end

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
    return (
      <main className="flex items-center justify-center">
        <div className="post border-[1px] border-light-gray rounded-md bg-light-primary/70 py-[20px] px-[30px] mx-[15px] my-[20px] w-[423px] min-w-[300px] shadow-lg shadow-dark-blue hover:shadow-2xl transition-shadow animate__animated animate__fadeIn">
          <div className="text-light text-center">Error: {error.message}</div>
          <button
            className="block w-full text-center text-[16px] mt-[25px] border-[1px] border-solid border-light-gray rounded-sm py-[2px] transition-[1s] text-light-gray hover:text-light-primary hover:bg-light-gray"
            onClick={() => window.location.reload(false)}
          >
            Reload
          </button>
        </div>
      </main>
    )
  } else if (!isLoaded || props.data["data"] == undefined) {
    return (
      <div className="w-full flex items-center justify-center mt-10">
        <div className="loading w-16 h-16 border-4 border-light border-solid rounded-full animate-spin"></div>
      </div>
    )
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
      <>
        <main className={mainTagClassList.join(" ")}>
          {props.order == "post" &&
            props
              .search(props.data["data"], props.searchParam, props.q)
              .map((value, index) => (
                <props.post value={value} index={index} key={value.id} />
              ))}
          {props.order == "row" &&
            props
              .search(props.data["data"], props.searchParam, props.q)
              .map((value, index) => (
                <props.postRow value={value} index={index} key={value.id} />
              ))}
        </main>
        <Footer owner="Ali Soleimani" />
      </>
    )
  }
}
//* Posts JSX code end
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
        post={Post}
        postRow={PostRow}
        q={q}
        search={search}
        searchParam={searchParam}
        order={order}
      />
    </>
  )
}

//! Render app
ReactDOM.render(<App />, document.getElementById("root"))
