import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useSortableData from "../../common/useSortableData";
import Loading from "../../common/Loading";
const apiUrl = process.env.API_URL;

function SalesmenTable() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [salesmen, setSalesmen] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [sortedSalesmen, requestSort, sortConfig] = useSortableData(salesmen);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  useEffect(() => {
    const getSalesmen = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiUrl}/salesmen-detail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setSalesmen(responseData.salesmen);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    getSalesmen();
  }, []);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch2Change = (e) => {
    setSearch2(e.target.value);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    setLoading(true);
    if (search2 != "") {
      const searchFetch = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(
            `${apiUrl}/salesmen-detail?from=${search}&to=${search2}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseData = await response.json();
          setSalesmen(responseData.salesmen);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      searchFetch();
    } else {
      const searchFetch = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(
            `${apiUrl}/salesmen-detail?from=${search}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseData = await response.json();
          setSalesmen(responseData.salesmen);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      searchFetch();
    }
  };
  const searchBar = () => {
    return (
      <Fragment>
        <div className="col-5 offset-2 col-md-3 offset-md-0 order-0 order-md-2">
          <input
            type="date"
            className="form-control text"
            id="searchDate"
            onChange={handleSearchChange}
          ></input>
        </div>
        <p className="col-2 col-md-1 order-1 order-md-3">من</p>
        <div className="col-5 offset-5 col-md-3 offset-md-0 order-2 order-md-0">
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
                      <div className="col-2 offset-1 offset-md-0 text">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-sm mt-1"
                        >
                          ابحث
                        </button>
                      </div>
                      {searchBar()}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-4 order-first order-md-last">
                  <h2 className="text">احصائيات المندوبين</h2>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="table-responsive">
                <table
                  className="table table-striped table-bordered table-hover text"
                  dir="rtl"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>
                        <th
                          onClick={() => requestSort("name")}
                          className={getClassNamesFor("name") + " button"}
                        >
                          المندوب{" "}
                        </th>
                      </th>
                      <th>عدد التقارير</th>
                      <th>عدد الطلبيات</th>
                      <th>سعر الطلبيات</th>
                    </tr>
                  </thead>
                  {loading == true ? (
                    <Loading />
                  ) : (
                    <tbody>
                      {sortedSalesmen.map((salesman) => {
                        return (
                          <tr key={salesman.id} className="font-weight-bold">
                            <th>{salesman.name}</th>
                            <th>{salesman.reports_count}</th>
                            <th>{salesman.orders_count}</th>
                            <td>{salesman.orders_price} $</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SalesmenTable;
