import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.API_URL;

function Orders() {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);
  const [seeMore, setSeeMore] = useState([{ order_id: 0, see: false }]);
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
  const handleOrdersDisapprovalButton = () => {
    const disapproveOrder = async (order_id) => {
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
        if (responseData.orders.length != seeMore.length) {
          const see = responseData.orders.map((o) => o.seeMore);
          setSeeMore(see);
        }
        setData(responseData.orders);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrders();
  }, []);
  const order = (
    approval,
    order_id,
    price,
    user,
    zone,
    doctor,
    items,
    pharmacy,
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
                <p className="col-sm-3 mb-0">الطبيب: {doctor}</p>
                <p className="col-sm-3 mb-0">الصيدلية: {pharmacy}</p>
                <p className="col-sm-3 mb-0">الشركة: {company}</p>
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
                        <th>سعر الكمية</th>
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
                            <td>{item.price}</td>
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
        <div className="col-sm-12 p-2">
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
        <div className="col-sm-12 p-2">
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
  return (
    <section className="main">
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-9 mr-auto">
          <div className="row pt-md-3 pr-2 pl-2 mt-md-3 mb-5">
            {data.map((o, index) =>
              order(
                o.approval,
                o.id,
                o.price,
                o.user,
                o.zone,
                o.doctor,
                o.items,
                o.pharmacy,
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
