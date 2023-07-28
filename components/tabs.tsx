import { Fragment } from "react";

interface TabPanelProps {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabProps {
  tabPanels: TabPanelProps[];
}

export default function Tabs({ tabPanels }: TabProps) {
  return (
    <div className="relative w-full">
      {tabPanels.map(({ key, title, content }) => (
        <Fragment key={key}>
          <div className="border-b border-brand-gold">{title}</div>
          <div>{content}</div>
        </Fragment>
      ))}
    </div>
  );
}
