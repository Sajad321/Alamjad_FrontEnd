import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Orders() {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);
  const [seeMore, setSeeMore] = useState([{ order_id: 0, see: false }]);
  const [searchType, setSearchType] = useState("0");
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [searchedOrders, setSearchedOrders] = useState([...data]);
  const findOrder = (order_id) =>
    seeMore.findIndex((o) => o.order_id == order_id);
  const handleSeeMore = (order_id) => {
    const index = findOrder(order_id);
    let nee = [...seeMore];
    nee[index] = { ...nee[index], see: !nee[index].see };
    setSeeMore(nee);
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
      }
    };
    approveOrder();
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
      }
    };
    disapproveOrder();
    toast.error("تم رفض الطلبية");
  };
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
        if (
          seeMore[0].order_id == 0 ||
          responseData.orders.length != seeMore.length
        ) {
          const see = responseData.orders.map((o) => o.seeMore);
          setSeeMore(see);
          setSearchedOrders(responseData.orders);
        }
        setData(responseData.orders);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrders();
  }, [data]); // data
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch2Change = (e) => {
    setSearch2(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    const reg = new RegExp(search, "i");
    if (searchType == "1") {
      setSearchedOrders(
        [...data].filter(
          (o) => o.date_of_order <= search2 && o.date_of_order >= search
        )
      );
      setSearch("");
      setSearch2("");
    } else if (searchType == "2") {
      setSearchedOrders([...data].filter((o) => o.user.match(reg)));
      setSearch("");
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
            <p className="col-sm-3 mb-0">السعر الكلي: {price}</p>
            <p className="col-sm-3 mb-0">تاريخ الطلبية: {date_of_order}</p>
            <p className="col-sm-3 mb-0">المنطقة: {zone}</p>
          </div>
          {seeMore[findOrder(order_id)].see ? (
            <Fragment>
              <div className="row">
                <p className="col-sm-3 mb-0">الصيدلية: {pharmacy}</p>
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
          )}
        </div>
      );
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
  const searchBar = () => {
    if (searchType == "0") {
      return (
        <div className="col-7">
          <p className="form-control text">بحث حسب </p>
        </div>
      );
    } else if (searchType == "1") {
      return (
        <Fragment>
          <div className="col-5 col-md-3 order-0 order-md-2">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearchChange}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-1 order-md-3">من</p>
          <div className="col-5 offset-5 offset-sm-4 col-md-3 offset-md-0 order-2 order-md-0">
            <input
              type="date"
              className="form-control text"
              id="searchDate"
              onChange={handleSearch2Change}
            ></input>
          </div>
          <p className="col-2 col-md-1 order-3 order-md-1">الى</p>
        </Fragment>
      );
    } else if (searchType == "2") {
      return (
        <div className="col-7">
          <input
            type="text"
            className="form-control text"
            id="searchDoctor"
            onChange={handleSearchChange}
            placeholder="ابحث"
          ></input>
        </div>
      );
    }
  };
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            <div className="col-12">
              <div className="row mt-3">
                <div className="col-12 col-md-8 order-last order-md-first">
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
                          <option value="2">الاسم</option>
                        </select>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">الطلبيات</h2>
                </div>
              </div>
            </div>
            {searchType == "0"
              ? data.map((o) =>
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
                )
              : searchedOrders.map((o) =>
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
                )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
