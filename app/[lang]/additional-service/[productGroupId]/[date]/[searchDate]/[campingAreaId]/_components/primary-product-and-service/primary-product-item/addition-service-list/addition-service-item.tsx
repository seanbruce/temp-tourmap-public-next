import { motion } from "framer-motion";
import { faTrashCan, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from "clsx";

function AdditionAttribute({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm text-slate-700 flex flex-nowrap justify-between items-end">
      <span className="truncate">{title}</span>
      <span>{children}</span>
    </p>
  );
}

interface AdditionServiceItemProps {
  additionService: any;
  optionRevealedServiceId: string | null;
  setOptionRevealedServiceId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

function AdditionServiceItem({
  additionService,
  optionRevealedServiceId,
  setOptionRevealedServiceId,
}: AdditionServiceItemProps) {
  const isRevealed = optionRevealedServiceId === additionService.extraProductId;
  return (
    <div
      key={additionService.extraProductId}
      className="first-of-type:pt-0 last-of-type:pb-0 border-b border-slate-300 last-of-type:border-b-0 flex flex-nowrap"
      onClick={(event) => {
        event.stopPropagation();
        setOptionRevealedServiceId((prev) => {
          if (prev === additionService.extraProductId) {
            return null;
          }
          return additionService.extraProductId;
        });
      }}
    >
      <motion.div layout className={clsx("p-2 grow")}>
        <AdditionAttribute title="名稱">
          {additionService.extraProductName}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.primarySpec.unitName}>
          {additionService.primarySpec.selectedOption}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.secondarySpec.unitName}>
          {additionService.secondarySpec.selectedOption}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.primaryTimeSpec.dateTitle}>
          {additionService.primaryTimeSpec.date}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.primaryTimeSpec.timeTitle}>
          {additionService.primaryTimeSpec.time}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.secondaryTimeSpec.dateTitle}>
          {additionService.secondaryTimeSpec.date}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.secondaryTimeSpec.timeTitle}>
          {additionService.secondaryTimeSpec.time}
        </AdditionAttribute>
        <AdditionAttribute title={additionService.amount.title}>
          {`${additionService.amount.amount}${additionService.amount.unit}`}
        </AdditionAttribute>
        <AdditionAttribute title="小計">
          NT$ {additionService.totalPrice}
        </AdditionAttribute>
        <AdditionAttribute title="備註">
          {additionService.customerRemark}
        </AdditionAttribute>
      </motion.div>
      <motion.div
        layout
        animate={{
          width: isRevealed ? "80px" : "20px",
          backgroundColor: isRevealed ? "#EF4444" : "#dddddd",
        }}
        className={clsx(
          "overflow-hidden",
          "flex",
          "justify-center",
          "items-center",
          "bg-red-500"
        )}
        onClick={(event) => {
          event.stopPropagation();
          if (isRevealed) {
          } else {
            setOptionRevealedServiceId(additionService.extraProductId);
          }
        }}
      >
        {isRevealed ? (
          <FontAwesomeIcon icon={faTrashCan} className="text-white" />
        ) : (
          <FontAwesomeIcon icon={faBars} rotation={90} className="text-white" />
        )}
      </motion.div>
    </div>
  );
}

export { AdditionServiceItem };
