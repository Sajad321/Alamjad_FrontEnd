import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";

const apiUrl = process.env.API_URL;

function Orders() {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    orders: [],
    searchedOrders: [],
    checkbox: false,
    currentPage: 1,
    currentSearchPage: 1,
    totalPages: 1,
    totalSearchPages: 1,
    seeMore: [{ order_id: 0, see: false }],
    searchedSeeMore: [{ order_id: 0, see: false }],
    searchType: "0",
    search: "",
    search1: "",
    search2: "",
    loading: true,
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        const see = responseData.orders.map((o) => o.seeMore);
        setState({
          ...state,
          seeMore: see,
          searchedSeeMore: see,
          orders: responseData.orders,
          totalPages: responseData.pages,
          searchedOrders: responseData.orders,
          totalSearchPages: responseData.pages,
          loading: false,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrders();
  }, []); // data
  const findOrder = (order_id) => {
    if (state.searchType == "0") {
      return state.seeMore.findIndex((o) => o.order_id == order_id);
    } else {
      return state.searchedSeeMore.findIndex((o) => o.order_id == order_id);
    }
  };
  const handleSeeMore = (order_id) => {
    if (state.searchType == "0") {
      const index = findOrder(order_id);
      let nee = [...state.seeMore];
      nee[index] = { ...nee[index], see: !nee[index].see };
      setState({ ...state, seeMore: nee });
    } else {
      const index = findOrder(order_id);
      let nee = [...state.searchedSeeMore];
      nee[index] = { ...nee[index], see: !nee[index].see };
      setState({ ...state, searchedSeeMore: nee });
    }
  };
  const handleOrdersApproval = (order_id, approval) => {
    if (state.searchType == "0") {
      const index = state.orders.findIndex((o) => o.id == order_id);
      let nee = [...state.orders];
      nee[index] = { ...nee[index], approval };
      setState({
        ...state,
        orders: nee,
      });
    } else {
      const Sindex = state.searchedOrders.findIndex((o) => o.id == order_id);
      let Snee = [...state.searchedOrders];
      Snee[Sindex] = { ...Snee[Sindex], approval };
      setState({
        ...state,
        searchedOrders: Snee,
      });
    }
  };
  const handleOrdersApprovalButton = (order_id) => {
    const approveOrder = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/orders/${order_id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved: "1" }),
        });

        const responseData = await response.json();
      } catch (error) {
        console.log(error.message);
        handleOrdersApproval(order_id, 0);
        toast.warn("حصل خطأ");
      }
    };
    approveOrder();
    handleOrdersApproval(order_id, 1);
    toast.success("تمت الموافقة على الطلبية");
  };
  const handleOrdersDisapprovalButton = (order_id) => {
    const disapproveOrder = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/orders/${order_id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved: "2" }),
        });

        const responseData = await response.json();
      } catch (error) {
        console.log(error.message);
        handleOrdersApproval(order_id, 0);
        toast.warn("حصل خطأ");
      }
    };
    disapproveOrder();
    handleOrdersApproval(order_id, 2);
    toast.error("تم رفض الطلبية");
  };
  const handleOrdersCheckbox = () => {
    const ss = !state.checkbox;
    if (state.searchType == "0") {
      f(state.currentPage, ss);
    } else {
      f(
        state.currentSearchPage,
        ss,
        state.searchType,
        state.search,
        state.search1,
        state.search2
      );
    }
  };
  const handleSearchTypeChange = (e) => {
    setState({
      ...state,
      searchType: e.target.value,
      search: "",
      search1: "",
      search2: "",
      currentPage: 1,
    });
  };
  const handleSearchChange = (e) => {
    setState({ ...state, search: e.target.value });
  };
  const handleSearch1Change = (e) => {
    setState({ ...state, search1: e.target.value });
  };
  const handleSearch2Change = (e) => {
    setState({ ...state, search2: e.target.value });
  };

  const updatePage = (p) => {
    f(
      p,
      state.checkbox,
      state.searchType,
      state.search,
      state.search1,
      state.search2
    );
  };
  const f = async (page, checkbox, searchType, search, search1, search2) => {
    setState({ ...state, loading: true });
    const url =
      state.searchType == 0
        ? `${apiUrl}/orders?page=${page}&checkbox=${checkbox}`
        : `${apiUrl}/orders?page=${page}&checkbox=${checkbox}&searchType=${searchType}&search=${search}&search1=${search1}&search2=${search2}`;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      const see = responseData.orders.map((o) => o.seeMore);
      if (state.searchType == 0) {
        setState({
          ...state,
          orders: responseData.orders,
          seeMore: see,
          totalPages: responseData.pages,
          currentPage: page,
          checkbox,
          loading: false,
        });
      } else {
        setState({
          ...state,
          searchedOrders: responseData.orders,
          searchedSeeMore: see,
          totalSearchPages: responseData.pages,
          currentSearchPage: page,
          checkbox,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    if (state.searchType != "0") {
      f(
        1,
        state.checkbox,
        state.searchType,
        state.search,
        state.search1,
        state.search2
      );
    }
  };

  const order = (
    approval,
    order_id,
    price,
    user,
    zone,
    items,
    pharmacy,
    doctor,
    company,
    date_of_order,
    comment
  ) => {
    const showing = () => {
      return (
        <div className="col-10 text-right text-secondary">
          <h5>{order_id} :رقم الطلبية</h5>
          <div className="row" dir="rtl">
            <p className="col-sm-3 mb-0">اسم المندوب: {user}</p>
            <p className="col-sm-3 mb-0">الصيدلية: {pharmacy}</p>
            <p className="col-sm-3 mb-0">تاريخ الطلبية: {date_of_order}</p>
            <p className="col-sm-3 mb-0">المنطقة: {zone}</p>
          </div>
          {see()}
        </div>
      );
    };
    const see = () => {
      if (state.searchType == "0") {
        return state.seeMore[findOrder(order_id)].see ? (
          <Fragment>
            <div className="row">
              <p className="col-sm-3 mb-0">السعر الكلي: {price}</p>
              <p className="col-sm-3">الطبيب: {doctor}</p>
              <p className="col-sm-3 mb-0">{company} :الشركة</p>
              <p className="col-sm-3">التعليق: {comment}</p>
            </div>
            <div className="row">
              <div className="col-10 offset-2 col-sm-11 offset-sm-1 col-lg-12 offset-lg-0 table-responsive">
                <table
                  className="table table-striped table-bordered table-hover text"
                  dir="rtl"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>المادة</th>
                      <th>الكمية</th>
                      <th>هدية</th>
                      <th>البونس</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      return (
                        <tr key={item.id} className="font-weight-bold">
                          <th>{item.item_name}</th>
                          <th>{item.quantity}</th>
                          <th>{item.gift == true ? "نعم" : "لا"}</th>
                          <td>{item.bonus}&#37;</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p onClick={() => handleSeeMore(order_id)} className="see-more">
              اظهار القليل
            </p>
          </Fragment>
        ) : (
          <p onClick={() => handleSeeMore(order_id)} className="see-more">
            ...قراءة المزيد
          </p>
        );
      } else {
        return state.searchedSeeMore[findOrder(order_id)].see ? (
          <Fragment>
            <div className="row">
              <p className="col-sm-3 mb-0">السعر الكلي: {price}</p>
              <p className="col-sm-3">الطبيب: {doctor}</p>
              <p className="col-sm-3 mb-0">{company} :الشركة</p>
              <p className="col-sm-3">التعليق: {comment}</p>
            </div>
            <div className="row">
              <div className="col-10 offset-2 col-sm-11 offset-sm-1 col-lg-12 offset-lg-0 table-responsive">
                <table
                  className="table table-striped table-bordered table-hover text"
                  dir="rtl"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>المادة</th>
                      <th>الكمية</th>
                      <th>هدية</th>
                      <th>البونس</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      return (
                        <tr key={item.id} className="font-weight-bold">
                          <th>{item.item_name}</th>
                          <th>{item.quantity}</th>
                          <th>{item.gift == true ? "نعم" : "لا"}</th>
                          <td>{item.bonus}&#37;</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p onClick={() => handleSeeMore(order_id)} className="see-more">
              اظهار القليل
            </p>
          </Fragment>
        ) : (
          <p onClick={() => handleSeeMore(order_id)} className="see-more">
            ...قراءة المزيد
          </p>
        );
      }
    };
    if (approval == "0") {
      return (
        <div className="col-sm-12 p-2" key={order_id}>
          <div className="card card-common">
            <div className="card-body">
              <div className="row">
                <div
                  className="col-2 btn-group btn-group-justified"
                  role="group"
                >
                  <button
                    onClick={() => handleOrdersDisapprovalButton(order_id)}
                    className="btn btn-danger btn-sm"
                  >
                    رفض
                  </button>
                  <button
                    onClick={() => handleOrdersApprovalButton(order_id)}
                    className="btn btn-success btn-sm "
                  >
                    موافقة
                  </button>
                </div>
                {showing()}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (approval == "2") {
      return (
        <div className="col-sm-12 p-2" key={order_id}>
          <div className="card card-common">
            <div className="card-body">
              <div className="row">
                <p className="col-2 btn btn-danger btn-sm btn-width">
                  غير موافق عليها
                </p>
                {showing()}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (approval == "1") {
      return (
        <div className="col-sm-12 p-2" key={order_id}>
          <div className="card card-common">
            <div className="card-body">
              <div className="row">
                <p className="col-2 btn btn-success btn-sm btn-width">
                  تمت الموافقة
                </p>
                {showing()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const fromTo = () => {
    return (
      <Fragment>
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="search"
            onChange={handleSearchChange}
            placeholder="ابحث"
            value={state.search}
          ></input>
        </div>
        <div className="col-5 offset-5 col-md-3 offset-md-0 order-0 order-md-2 mt-1">
          <input
            type="date"
            className="form-control text"
            id="searchDate1"
            onChange={handleSearch1Change}
          ></input>
        </div>
        <p className="col-2 col-md-1 order-1 order-md-3 mt-1">من</p>
        <div className="col-5 offset-5 col-md-3 offset-md-4 offset-md-0 order-2 order-md-0 mt-md-1">
          <input
            type="date"
            className="form-control text"
            id="searchDate2"
            onChange={handleSearch2Change}
          ></input>
        </div>
        <p className="col-2 col-md-1 order-3 order-md-1 mt-md-1">الى</p>
      </Fragment>
    );
  };
  const searchBar = () => {
    if (state.searchType == "0") {
      return (
        <div className="col-7">
          <p className="form-control text">بحث حسب </p>
        </div>
      );
    } else if (state.searchType == "1") {
      return (
        <Fragment>
          <div className="col-5 col-md-3 order-0 order-md-2">
            <input
              type="date"
              className="form-control text"
              id="searchDate1"
              onChange={handleSearch1Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3">من</p>
          <div className="col-5 offset-5 offset-sm-4 col-md-3 offset-md-0 order-2 order-md-0">
            <input
              type="date"
              className="form-control text"
              id="searchDate2"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1">الى</p>
        </Fragment>
      );
    } else if (state.searchType == "6") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchItem"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
    } else {
      return fromTo();
    }
  };
  const render_orders = () => {
    if (state.loading == true) {
      return (
        <div className="col-12">
          <div className="text-center justify-content-center">
            <Loading />
          </div>
        </div>
      );
    } else {
      if (state.searchType == "0") {
        return state.orders.map((o) =>
          order(
            o.approval,
            o.id,
            o.price,
            o.user,
            o.zone,
            o.items,
            o.pharmacy,
            o.doctor,
            o.company,
            o.date_of_order,
            o.comment
          )
        );
      } else {
        return state.searchedOrders.map((o) =>
          order(
            o.approval,
            o.id,
            o.price,
            o.user,
            o.zone,
            o.items,
            o.pharmacy,
            o.doctor,
            o.company,
            o.date_of_order,
            o.comment
          )
        );
      }
    }
  };
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-12">
              <div className="row mt-3">
                <div className="col-12 col-md-8 order-2 order-md-0">
                  <form onSubmit={handleSearchButton}>
                    <div className="form-group row mt-1">
                      <div className="col-2 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                        >
                          ابحث
                        </button>
                      </div>
                      <div className="col-3 col-sm-2">
                        <select
                          id="searchType"
                          onChange={handleSearchTypeChange}
                          className="form-control"
                          dir="rtl"
                        >
                          <option value="0" defaultValue>
                            الكل
                          </option>
                          <option value="1">التاريخ</option>
                          <option value="2">المندوب</option>
                          <option value="3">المنطقة</option>
                          <option value="4">الصيدلية</option>
                          <option value="5">الشركة</option>
                          <option value="6">المادة</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 offset-8 col-md-2 offset-md-0 order-1 order-md-1 pl-md-5 pr-md-0 font-weight-bold">
                  الموافق عليها{" "}
                  <input type="checkbox" onChange={handleOrdersCheckbox} />
                </div>
                <div className="col-12 col-md-2 order-0 order-md-2">
                  <h2 className="text">الطلبيات</h2>
                </div>
              </div>
            </div>
            {render_orders()}
            <div className="col-12">
              {state.searchType == "0" ? (
                <Pagination
                  totalPages={state.totalPages}
                  currentPage={state.currentPage}
                  pageNeighbours={1}
                  pageChange={updatePage}
                />
              ) : (
                <Pagination
                  totalPages={state.totalSearchPages}
                  currentPage={state.currentSearchPage}
                  pageNeighbours={1}
                  pageChange={updatePage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
