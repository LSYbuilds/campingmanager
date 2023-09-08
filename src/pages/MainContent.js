import React, { useEffect, useState } from "react";
import { ContentMain } from "../css/maincontent-style";
import MainChart from "../component/MainChart";
import {
  getAdminMain,
  getShoppingMallData,
  getTodayData,
} from "../api/adminmainFetch";

const MainCotent = () => {
  // 유저데이터목록
  const [chartdata, setChartData] = useState([]);
  // 유저데이터 수
  const [chartlength, setchartlength] = useState("");

  const [manDataResult, setManDataResult] = useState("");
  const [womanDateResult, setWomanDateResult] = useState("");
  const [ageDataResult, setAgeDataResult] = useState([]);
  // main 오늘의 할일 state
  const [todayData, setTodayData] = useState({});
  // main 쇼핑몰 현황
  const [shoppingData, setShoppingData] = useState([])
  // 차트데이터 불러오기
  const userChartDate = async () => {
    try {
      const data = await getAdminMain();
      console.log("데이터 넘어옴?", data);
      console.log("데이터 갯수?", data.length);
      setChartData(data);
      setchartlength(data.length);
      resultPie(data);
      agePie(data);
    } catch (error) {
      console.log(error);
    }
  };

  // main 오늘의 할 일 데이터
  const userMainTodayData = async () => {
    try {
      const data = await getTodayData();
      console.log("오늘 할일 넘어오냐?", data);
      setTodayData(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 메인 쇼핑몰 현황 데이터
  const userMainShopping = async() => {
    try {
      const data = await getShoppingMallData()
      console.log("쇼핑몰현황 넘어오냐?", data)
      setShoppingData(data)
      
    }catch(err) {
      console.log(err)
    }
  }




  const resultPie = data => {
    const AllList = data.length;
    const manData = data.filter(item => item.gender === 0);
    const woman = data.filter(item => item.gender === 1);
    const manDataLength = manData.length;
    const womanDataLength = woman.length;

    const ageData = data.filter(item => item.age <= 10);
    const underTan = ageData.length;

    console.log("전체데이터 갯수", AllList);
    console.log("남자데이터 갯수", manDataLength);
    console.log("여자데이터 갯수", womanDataLength);
    console.log("내 나이가 어때서", underTan);
    setManDataResult((manDataLength / AllList).toFixed(2) * 100);
    setWomanDateResult((womanDataLength / AllList).toFixed(2) * 100);
    console.log(manDataResult);
    console.log(womanDateResult);
  };

  const agePie = data => {
    const ten = data.filter(item => item.age === 0);
    const twenty = data.filter(item => item.age === 20);
    const thirty = data.filter(item => item.age === 30);
    const forty = data.filter(item => item.age === 40);
    const ageelse = data.filter(item => item.age > 40);
    const ageLengthData = [ten, twenty, thirty, forty, ageelse];
    setAgeDataResult(ageLengthData);
    console.log(ageLengthData[0].length);
  };
  useEffect(() => {
    userChartDate();
    userMainTodayData();
    userMainShopping();
  }, []);

  return (
    <ContentMain>
      <div className="content_inner">
        <h2>오늘의 할일</h2>
        <ul className="miancontent_data">
          <li>
            <span>회원 수</span>
            <span>{todayData.userCount}</span>
          </li>
          <li>
            <span>배송 준비중</span>
            <span>{todayData.shippingBefore}</span>
          </li>
          <li>
            <span>배송중</span>
            <span>{todayData.shipping}</span>
          </li>
          <li>
            <span>환불전</span>
            <span>{todayData.refundBefore}</span>
          </li>
          <li>
            <span>품절 상품</span>
            <span>{todayData.soldOut}</span>
          </li>
          <li>
            <span>새 게시물</span>
            <span>{todayData.newBoard}</span>
          </li>
          <li>
            <span>예약</span>
            <span>{todayData.newReserve}</span>
          </li>
        </ul>
        <div className="main_chart">
          <MainChart
            manDataResult={manDataResult}
            womanDateResult={womanDateResult}
            ageDataResult={ageDataResult}
          />
        </div>
        <h2 className="shoppingmall">쇼핑몰 현황</h2>
        <ul className="miancontent_data">
          <li>
            <span>날짜</span>
            <span>{}</span>
            
          </li>
          <li>
            <span>주문</span>
            <span></span>
          </li>

          <li>
            <span>배송완료</span>
            <span></span>
          </li>
          <li>
            <span>환불완료</span>
            <span></span>
           
          </li>
        </ul>
      </div>
    </ContentMain>
  );
};

export default MainCotent;
