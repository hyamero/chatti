import { Dialog } from "@headlessui/react";
import { useGlobal } from "../../contexts/GlobalContext";

import TransitionWrap from "./TransitionWrap";
import { User } from "../User";

const UserInfo: React.FC = () => {
  const { userInfoOpen, closeUserInfo } = useGlobal();

  return (
    <TransitionWrap show={userInfoOpen} onClose={closeUserInfo}>
      <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-4 shadow-xl transition-all">
        <User
          clickEvent={closeUserInfo}
          tlButton="Close"
          showSearch={false}
          parentClass="text-left"
        />
      </Dialog.Panel>
    </TransitionWrap>
  );
};

export default UserInfo;
