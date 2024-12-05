import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function InformationCard() {
  const [categoryExp, setCategoryExp] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("https://vle-server.onrender.com/categoryExpense")
        .then((res) => {
          setCategoryExp(res.data);
        });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="hidden md:block absolute bottom-10 w-full left-0">
          render(
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          )
        </div>
      ) : (
        ""
      )}
      <div>
        {categoryExp && (
          <div className="hidden md:block absolute bottom-10 w-full left-0">
            <div className="flex items-center justify-center gap-10 font-Montserrat">
              {categoryExp.map((category) => (
                <button
                  key={category.category}
                  className="p-4 rounded-xl dark:bg-gray-800 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 transition-colors"
                >
                  <h1 className="dark:text-gray-300 font-semibold text-sm transition-colors">
                    {category.category} : {category.total_amount}
                  </h1>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
