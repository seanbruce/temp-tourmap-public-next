"use client";

import clsx from "clsx";
import { OrderOrUnOrderProvider, useOrderOrUnOrder } from "./order-list/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

type UnOrderListProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

function UnOrderList({ children, className, ...props }: UnOrderListProps) {
  return (
    <OrderOrUnOrderProvider value="unOrder">
      <ul className={clsx("flex", "flex-col", "gap-1", className)} {...props}>
        {children}
      </ul>
    </OrderOrUnOrderProvider>
  );
}

type OrderListProps = React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

function OrderList({ children, className, ...props }: OrderListProps) {
  return (
    <OrderOrUnOrderProvider value="order">
      <ol className={clsx("flex", "flex-col", "gap-1", className)} {...props}>
        {children}
      </ol>
    </OrderOrUnOrderProvider>
  );
}

type ListItemProps = React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

function ListItem({ children, className, ...props }: ListItemProps) {
  return (
    <li
      className={clsx("text-white flex flex-nowrap items-start", className)}
      {...props}
    >
      <FontAwesomeIcon
        icon={faCircle}
        className="mt-1.5 mr-2 text-brand-green w-3 h-3"
      />
      <div>{children}</div>
    </li>
  );
}

export { UnOrderList, OrderList, ListItem };
