import React, { useEffect } from "react";
import { getAllUserDetails } from "../../Features/Admin/AdminFeature";
import { useDispatch, useSelector } from "react-redux";
import useDebouncing from "../../CustomHooks/useDebouncing";

const ManageUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  const debounce = useDebouncing(getAllUserDetails);

  //   console.log(users);

  useEffect(() => {
    debounce();
  }, [debounce]);

  return (
    <div>
      <ul className="space-y-4">
        {users.map((user) => (
          <li className="border-2" key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUser;
