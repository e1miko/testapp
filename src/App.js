import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from './components/Table'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Paginator from './components/paginator';


function App() {

  const baseUrl = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/'
  const [data, setData] = useState([]) ;
  const [selectedDate, setSelectedDate] = useState(null);
  const [directionSort, setDirectionSort] = useState(true);
  const [totalCountRow, setTotalCountRow] = useState(0);
  const [totalCountPage, setTotalCountPage] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState('');
  const [searchText, setSearchText] = useState('');
  const limitCountPage = 20
  

  // sort data 
  const sortData = (field) => {
    const copyData = data.concat();

    let sortData;
    if (directionSort) {
      sortData = copyData.sort(
        (a, b) => {return a[field] > b[field] ? 1 : -1}
      )} 
      sortData = copyData.reverse(
        (a, b) => {return a[field] > b[field] ? 1 : -1}
    )

    setData(sortData)
    setDirectionSort(!directionSort)
  }

  // get data 
  useEffect(() => {
    axios.get(baseUrl)
    .then (
      (res) => {
        setData(res.data.records.splice(0, 500))
        console.log(data)
      }
    )
  }, [])

   // filter data
  const getFilteredData = () => {
    if (!searchText)
    { 
      return data 
    } 
      return data.filter
        (el => {
          return el['countriesAndTerritories'].toLowerCase().includes(searchText.toLowerCase())
    })
  } 

  const filtredData = getFilteredData()

  const onSearchSend = (text) => {
    setSearchText(text)
  }


  // pages
  const lastBlockRow = currentPageNumber*limitCountPage
  const firstBlockRow = lastBlockRow - limitCountPage +1
  const currentBlockRows = filtredData.slice(firstBlockRow, lastBlockRow)

  const currentPage = (pg) => {
    setCurrentPageNumber(pg)
    setButtonDisabled('')}

  useEffect (() => {
    setTotalCountRow(filtredData.length)
    const getTotalCountPage = Math.ceil(totalCountRow/limitCountPage)
    setTotalCountPage(getTotalCountPage)

  }, [setTotalCountRow, filtredData.length, totalCountRow])
  console.log(currentPageNumber)

  let pages = []
  for (let i=1; i<=totalCountPage; i++) {
    pages.push(i)
  }

  // page buttons
  const onNextClick = () => {
    if (currentPageNumber > totalCountPage -1)
    {
      setButtonDisabled('disabled')
      console.log(buttonDisabled)
      return
    }
    setCurrentPageNumber(currentPageNumber +1)

  }

  const onPreviousClick = () => {
    if (currentPageNumber < 2) 
    {
      setButtonDisabled('disabled')
      return
    }
    setCurrentPageNumber(currentPageNumber -1)
  }

  return (
    <div className="container" style = {{margin: "25px"}}>
      <DatePicker 
        selected={selectedDate} 
        onChange={date => setSelectedDate(date)}
        dateFormat='dd/MM/yyyy'
        maxDate = {new Date()}
        showYearDropdown/>

      <React.Fragment>
        <Table 
          data={currentBlockRows}
          sortData={sortData}
          directionSort={directionSort}
          onSearchSend={onSearchSend}/>
      </React.Fragment>

      <Paginator
        pages={pages}
        currentPage={currentPage}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        buttonDisabled={buttonDisabled}/>
    </div>   
  );
}

export default App;