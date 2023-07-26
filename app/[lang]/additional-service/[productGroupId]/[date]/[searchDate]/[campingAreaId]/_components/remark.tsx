import Section from "@/components/section";

export default function Remark() {
  return (
    <Section title="其它備註">
      <textarea
        className="w-full p-2 text-slate-900"
        rows={7}
        placeholder="輸入備註"
      ></textarea>
    </Section>
  );
}
