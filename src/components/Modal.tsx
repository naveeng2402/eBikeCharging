import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

import { overlay, panel } from "../animation/Modal";
import { MarkerShape } from "../types/markers";

interface props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: MarkerShape;
}

const Modal = ({ isOpen, setIsOpen, data }: props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="fixed bottom-0 left-0 right-0  overflow-y-auto sm:pt-[70vh]"
    >
      <Dialog.Overlay
        as={motion.div}
        variants={overlay}
        initial="hidden"
        exit="hidden"
        animate="animate"
        className="fixed inset-0 bg-gray-500/40"
      />
      <Dialog.Panel
        as={motion.div}
        variants={panel}
        initial="hidden"
        exit="hidden"
        animate="animate"
        className="relative flex h-full w-full flex-col gap-3 rounded-t-3xl bg-emerald-800 p-5 md:h-screen md:w-1/4 md:min-w-fit md:rounded-none md:pt-[20%]"
      >
        <div className="flex h-full flex-col items-center justify-start gap-2">
          <Dialog.Title className="font-serif text-3xl font-semibold text-white">
            {data.place}
          </Dialog.Title>
          <Dialog.Description className="text-lg font-normal text-emerald-200">
            Charging Station
          </Dialog.Description>
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <p className="text-xl font-bold text-emerald-100">
              Latitude:{" "}
              <span className="text-lg font-light text-emerald-50">
                {data.lat}
              </span>
            </p>
            <p className="text-xl font-bold text-emerald-100">
              Longitude:
              <span className="text-lg font-light text-emerald-50">
                {data.lon}
              </span>
            </p>
          </div>
        </div>

        <button
          className="focus: rounded-md bg-green-500 py-2 text-xl font-bold text-white outline-none ring-offset-green-800 focus:ring focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setIsOpen(false)}
        >
          Done
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Modal;
