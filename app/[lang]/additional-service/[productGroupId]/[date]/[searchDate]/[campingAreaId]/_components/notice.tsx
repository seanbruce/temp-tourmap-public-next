import { Checkbox } from "@/components/checkbox";
import { ListItem, UnOrderList } from "@/components/order-list";
import Section from "@/components/section";

export default function Notice() {
  return (
    <Section title="注意事項">
      <UnOrderList>
        <ListItem>
          客房所有傢俱陳設，禁止擅自移動，若因此造成損傷，將照價賠償。
        </ListItem>
        <ListItem>
          同房加床，加人，加餐，可於附加服務點選加人及加訂餐之服務，或在&quot;其他備註&quot;加註需求。
        </ListItem>
        <ListItem>退房時間：中午11點，入住時間：下午16點。</ListItem>
        <ListItem>
          若當日下午六點前無法到達，請與飯店接待櫃台連絡。(037)941-951分機121。
        </ListItem>
        <ListItem>
          飯店不開放寵物入館，但備有寵物寄宿區提供預約；另設電動車充電設備(採預約制)；若有需要請在&quot;其他備註&quot;加註需求。
        </ListItem>
        <ListItem>
          入住前三天，飯店會以簡訊通知住宿訊息；若有預訂晚餐者，將會一併以簡訊通知晚餐用餐型式。
        </ListItem>
        <ListItem>
          線上訂房銷售之專案，已有明載優惠權益及「注意事項」之相關說明條款者，以該專案之『說明及注意事項』為優先適用。例如：春節專案。
        </ListItem>
        <ListItem>
          此頁面所顯示之住房優惠價格不含服務費及稅金，結帳時會顯示完整總額；所有消費金額將於退房時開立全額發票。
        </ListItem>
        <ListItem>
          飯店禁止使用毒品及拉K，如經查獲報警處理；並全面禁菸、禁用空拍機。
        </ListItem>
        <ListItem>
          已完成訂房者，若臨時須加人、加餐、加床或其他需求，請提早利用客服信箱或line官方帳號與我們聯繫服務。
        </ListItem>
        <ListItem>
          觀止非國旅卡特約店，線上訂房及現場刷卡均無法核銷國旅卡。
        </ListItem>
        <ListItem>
          飯店客房-情房(雙人房)、套房(四人房)有多種房型，房型圖片僅供參考，實際住宿以飯店安排為主。
        </ListItem>
      </UnOrderList>
      <div className="py-5 flex justify-center">
        <Checkbox
          label="我已詳閱並同意注意事項及住房條款"
          // checked={userConsented}
          // onChange={(event) => setUserConsented(event.target.checked)}
        />
      </div>
    </Section>
  );
}
