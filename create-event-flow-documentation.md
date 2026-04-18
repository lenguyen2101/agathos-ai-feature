# Create Event – Flow Documentation (Agathos Platform)

> **URL:** https://play.agathos.be/events/create  
> **Ngày ghi chú:** 18/04/2026  
> **Trạng thái:** Draft (Chưa submit)

---

## Tổng quan Flow

Flow "Create Event" gồm **4 bước (steps)** được hiển thị qua thanh tiến trình (stepper) ở đầu trang:

| Bước | Tên | Mô tả |
|------|-----|--------|
| 1 | **Build your event page** | Nhập thông tin cơ bản của sự kiện |
| 2 | **Add ticket** | Tạo vé/ticket cho sự kiện |
| 3 | **Registration Form** | Tạo form thu thập thông tin người tham dự (có thể bỏ qua) |
| 4 | **Review and Submit for Approval** | Xem lại và gửi duyệt |

**Các nút điều hướng:**
- **Back / Previous** – Quay lại bước trước
- **Next** – Tiếp tục sang bước tiếp theo (có validation)
- **Save** – Lưu nháp hiện tại
- **Submit** – Gửi sự kiện để duyệt (chỉ xuất hiện ở bước 4)

---

## BƯỚC 1 – Build your event page

**Heading:** _"Build your event page"_  
**Sub-heading:** _"Add your event details and let attendees know what to expect"_

---

### 1.1 Event Title
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input (dạng underline) |
| Placeholder | `Event title` |
| Giới hạn ký tự | 200 ký tự (hiển thị counter: `0/200`) |
| Bắt buộc | Không có dấu `*` nhưng cần điền để hợp lệ |

---

### 1.2 Banner Photo
| Thuộc tính | Giá trị |
|---|---|
| Loại input | File upload (click vào vùng có dấu `+`) |
| Bắt buộc | ✅ Có (dấu `*`) |
| Ghi chú | ℹ️ _"You can edit your banner photo later"_ |
| Validation | Hiển thị lỗi đỏ: **"Please upload banner photo"** nếu bỏ trống |
| Xử lý | Hỗ trợ upload ảnh, có thể kéo-thả hoặc click để chọn file |

---

### 1.3 Event Type
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Dropdown (searchable combobox) |
| Bắt buộc | ✅ Có |
| Default | **Public Event** |
| Các tùy chọn | - Public Event _(mặc định)_ |
| | - Private – Unlisted With Password |
| | - Private – Unlisted Without Password |

---

### 1.4 Ticketing Type
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Dropdown (searchable combobox) |
| Bắt buộc | ✅ Có |
| Default | **Paid Event** |
| Các tùy chọn | - Free Event |
| | - Paid Event _(mặc định)_ |
| Ghi chú | ⚠️ Khi chọn **Paid Event**: hiển thị thông báo vàng _"Platform and processing fees apply for paid tickets. [Find out more]"_ |

---

### 1.5 Currency (For Tickets & Love Gift)
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Dropdown (searchable combobox) |
| Bắt buộc | ✅ Có (khi Ticketing Type là Paid Event) |
| Default | **SGD** |
| Các tùy chọn | Danh sách đầy đủ các loại tiền tệ quốc tế (có ô tìm kiếm) – ví dụ: SGD, USD, EUR, RUB, SAR, SBD, SCR, SDG, SEK... |
| Điều kiện hiển thị | Hiển thị khi **Ticketing Type = Paid Event** |

---

### 1.6 Timezone
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Dropdown (searchable combobox) |
| Bắt buộc | ✅ Có |
| Default | **(GMT +08:00) Asia/Singapore** |
| Các tùy chọn | Danh sách đầy đủ các múi giờ quốc tế (có ô tìm kiếm) |

---

### 1.7 Event Start Time
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Date-time picker |
| Placeholder | `DD/MM/YYYY | 00:00` |
| Bắt buộc | ✅ Có (dấu `*`) |
| UI picker | Calendar (tháng/năm) + scroll giờ/phút. Có nút **Now** và **OK** |
| Format | DD/MM/YYYY HH:MM |
| Validation | Highlight đỏ border nếu bỏ trống |

---

### 1.8 Event End Time
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Date-time picker |
| Placeholder | `DD/MM/YYYY | 00:00` |
| Bắt buộc | ✅ Có (dấu `*`) |
| UI picker | Calendar + scroll giờ/phút. Có nút **Now** và **OK** |
| Format | DD/MM/YYYY HH:MM |
| Validation | Lỗi đỏ dưới field: **"Please select end time"** nếu bỏ trống |

---

### 1.9 About Event
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Rich Text Editor (WYSIWYG) |
| Placeholder | `About Event` |
| Bắt buộc | Không |
| Ghi chú | ℹ️ _"Include more information like Programme Details, Theme of the Event etc."_ |
| Toolbar | Undo/Redo, Paragraph style, **Bold**, _Italic_, Underline, Strikethrough, Text color, Numbered list, Bullet list, Table, + More |

---

### 1.10 Location (Section)

#### 1.10.1 Street Address
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input (dạng underline) |
| Placeholder | `Type here` |
| Bắt buộc | ✅ Có (dấu `*`) |

#### 1.10.2 City
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input (dạng underline) |
| Placeholder | `City` |
| Bắt buộc | ✅ Có (dấu `*`) |

#### 1.10.3 State/Province/Region
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input (dạng underline) |
| Placeholder | `State/Province/Region` |
| Bắt buộc | Không – _(Optional)_ |

#### 1.10.4 Postal Code
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input (dạng underline) |
| Placeholder | `Postal Code` |
| Bắt buộc | Không – _(Optional)_ |

#### 1.10.5 Country
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Dropdown (searchable, hiển thị cờ quốc gia) |
| Bắt buộc | ✅ Có (dấu `*`) |
| Default | 🇸🇬 **Singapore** |
| Các tùy chọn | Danh sách đầy đủ các quốc gia trên thế giới |

---

### Validation Step 1 – Tóm tắt lỗi
| Field | Thông báo lỗi |
|---|---|
| Banner Photo | _"Please upload banner photo"_ |
| Event End Time | _"Please select end time"_ |

---

## BƯỚC 2 – Add Ticket

**Heading:** _"Add ticket"_  
**Sub-heading:** _"Create tickets to grant attendees access to your event"_

Mặc định có sẵn **Ticket 1** (dạng accordion có thể collapse/expand). Có thể thêm nhiều ticket bằng nút **`+ Add ticket`**.

---

### 2.1 Ticket Accordion
Mỗi ticket hiển thị dạng accordion với header **"Ticket [n]"** (n = số thứ tự). Click vào để mở rộng/thu gọn.

---

### 2.2 Ticket name
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input |
| Placeholder | `Ticket name` |
| Bắt buộc | ✅ Có (dấu `*`) |
| Giới hạn ký tự | 200 ký tự (counter: `0 / 200`) |

---

### 2.3 Sale Start Time
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Date-time picker |
| Placeholder | `DD/MM/YYYY | 00:00` |
| Bắt buộc | Không bắt buộc nếu bật toggle "Start sale as soon as Event page goes live" |
| Ghi chú | ℹ️ Icon thông tin bên cạnh label |
| Toggle liên quan | **"Start sale of tickets as soon as Event page goes live"** – khi bật (ON), Sale Start Time bị disable/không bắt buộc |

---

### 2.4 Sale End Time
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Date-time picker |
| Placeholder | `DD/MM/YYYY | 00:00` |
| Bắt buộc | ✅ Có (dấu `*`) |

---

### 2.5 Toggle: Start sale of tickets as soon as Event page goes live
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Toggle switch |
| Default | OFF |
| Hành vi | Khi bật ON: Sale Start Time không còn bắt buộc, bán vé ngay khi event page live |

---

### 2.6 Quantity
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Number input (spinbutton, có nút tăng/giảm) |
| Placeholder | `Quantity` |
| Bắt buộc | ✅ Có (dấu `*`) |

---

### 2.7 Price
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Number input (spinbutton, có nút tăng/giảm) |
| Prefix | Ký hiệu tiền tệ – ví dụ: `S$` (SGD) |
| Placeholder | `Price` |
| Bắt buộc | ✅ Có (dấu `*`) |
| Điều kiện | Chỉ có khi **Ticketing Type = Paid Event** |

---

### 2.8 Toggle: Show remaining ticket quantity
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Toggle switch |
| Default | OFF |
| Hành vi | Khi bật: Hiển thị số vé còn lại cho người mua |

---

### 2.9 Description
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Textarea |
| Placeholder | `Description` |
| Bắt buộc | ✅ Có (dấu `*`) |
| Giới hạn ký tự | 120 ký tự (counter: `0 / 120`) |

---

### 2.10 Add ticket (button)
Nút **`+ Add ticket`** – thêm ticket mới vào danh sách (mỗi ticket là 1 accordion riêng biệt).

---

## BƯỚC 3 – Registration Form

**Heading:** _"Registration Form"_  
**Sub-heading:** _"Gather additional information from your attendees during the ticket purchasing process."_

> ⚠️ **Lưu ý:** _"You can skip this step if it's not required."_ (có thể bỏ qua nếu không cần)

---

### 3.1 Loại thu thập thông tin (Radio selection)

| Option | Mô tả |
|---|---|
| **Ticket Buyer** _(Recommended)_ | Chỉ thu thập thông tin từ người mua vé, giúp checkout nhanh hơn |
| **Each Attendee** | Thu thập thông tin cho từng vé trong đơn hàng |

---

### 3.2 Tạo câu hỏi (Question)

Mỗi câu hỏi gồm các field:

#### 3.2.1 Question Prompt
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Text input (underline) |
| Placeholder | `Type the question` |
| Bắt buộc | ✅ Có (dấu `*`) |
| Giới hạn ký tự | 200 ký tự (counter: `0/200`) |
| Validation | _"Please enter a question prompt."_ nếu bỏ trống |

#### 3.2.2 Add description (button)
Nút **`+ Add description`** – thêm mô tả bổ sung cho câu hỏi (optional).

#### 3.2.3 Answer Type (Dropdown)
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Dropdown (searchable) |
| Default | **Short Answer (max: 200 characters)** |
| Các tùy chọn | - **Name** _(Used for attendee search)_ |
| | - **Email** _(Used for attendee search)_ |
| | - **Short Answer** (max: 200 characters) |
| | - **Long Answer** (max: 1000 characters) |
| | - **Single Choice** |
| | - **Checkboxes** |
| | - **Select From Dropdown** |

#### 3.2.4 Required Toggle
| Thuộc tính | Giá trị |
|---|---|
| Loại input | Toggle switch |
| Default | OFF |
| Hành vi | Khi ON: câu hỏi bắt buộc phải trả lời |

#### 3.2.5 Menu (3-dot icon)
Menu `⋮` cho phép thao tác thêm với question (xóa, v.v.).

---

### 3.3 Add Question (button)
Nút **`Add Question`** – thêm câu hỏi mới vào registration form.

---

## BƯỚC 4 – Review and Submit for Approval

**Heading:** _"Review and Submit for Approval"_  
**Sub-heading:** _"You can make additional edits after your event page is published."_

---

### 4.1 Màn hình Review

Hiển thị toàn bộ thông tin đã nhập gồm:

| Phần | Nội dung |
|---|---|
| **Banner** | Ảnh banner đã upload |
| **Event Type** | Loại sự kiện (Public / Private) |
| **Ticketing Type** | Free / Paid |
| **Start** | Ngày giờ bắt đầu |
| **End** | Ngày giờ kết thúc |
| **Event Title** | Tên sự kiện, tên tác giả (by admin) |
| **About Event** | Nội dung mô tả sự kiện |
| **Location** | Địa chỉ đầy đủ + bản đồ Google Maps |
| **Tickets** | Danh sách các ticket: tên, giá, số lượng, mô tả, thời gian bán |
| **Registration Form** | Loại (Ticket Buyer / Each Attendee) + danh sách câu hỏi |

---

### 4.2 Nút Submit
| Thuộc tính | Giá trị |
|---|---|
| Loại | Button (xanh đậm) |
| Label | **Submit** (kèm icon upload) |
| Hành vi | Gửi sự kiện để admin/platform duyệt |

---

## Tóm tắt các Field bắt buộc (*)

| Bước | Field bắt buộc |
|---|---|
| Step 1 | Banner Photo, Event Type, Ticketing Type, Currency (nếu Paid), Timezone, Event Start Time, Event End Time, Street Address, City, Country |
| Step 2 | Ticket name, Sale End Time, Quantity, Price (nếu Paid), Description |
| Step 3 | Question Prompt (nếu đã tạo question, không thể để trống) |
| Step 4 | _(Không có field nhập – chỉ review và Submit)_ |

---

## Luồng xử lý tổng thể

```
[Events Page]
    |
    v
[Click "Create Event"]
    |
    v
[Step 1: Build Event Page]
  → Điền: Title, Banner, Type, Ticketing Type, Currency, Timezone
  → Điền: Start/End Time, About Event (WYSIWYG)
  → Điền: Location (Street, City, State*, Postal*, Country)
  → Click [Next] → Saved & validated
    |
    v
[Step 2: Add Ticket]
  → Mỗi ticket: Name, Sale Time, Quantity, Price, Description
  → Có thể thêm nhiều ticket với [+ Add ticket]
  → Click [Next]
    |
    v
[Step 3: Registration Form] ← (CÓ THỂ BỎ QUA)
  → Chọn loại: Ticket Buyer / Each Attendee
  → Thêm Question(s): Prompt, Answer Type, Required toggle
  → Click [Next]
    |
    v
[Step 4: Review & Submit]
  → Xem lại toàn bộ thông tin
  → Click [Submit] → Gửi duyệt
```

---

*Document được tạo tự động bằng cách thao tác thực tế trên hệ thống Agathos.*
