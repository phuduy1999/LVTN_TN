USE [TN_TTTN]
GO
/****** Object:  UserDefinedTableType [dbo].[CauHoiType]    Script Date: 14/12/2021 7:42:15 CH ******/
CREATE TYPE [dbo].[CauHoiType] AS TABLE(
	[IDX] [int] NULL,
	[TRINHDO] [nchar](1) NOT NULL,
	[NOIDUNG] [nvarchar](max) NOT NULL,
	[DAP_AN] [nvarchar](30) NOT NULL,
	[MALOAICH] [nchar](15) NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[CTBTType]    Script Date: 14/12/2021 7:42:15 CH ******/
CREATE TYPE [dbo].[CTBTType] AS TABLE(
	[IDCAUHOI] [int] NULL,
	[STT] [int] NULL,
	[LUACHONSV] [nvarchar](30) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[LuaChonType]    Script Date: 14/12/2021 7:42:15 CH ******/
CREATE TYPE [dbo].[LuaChonType] AS TABLE(
	[IDX] [int] NULL,
	[STT] [nchar](1) NULL,
	[NOIDUNG] [nvarchar](200) NULL
)
GO
/****** Object:  UserDefinedFunction [dbo].[Num2Text]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[Num2Text](@Number float)
RETURNS nvarchar(4000) AS 
BEGIN
	DECLARE @sNumber nvarchar(4000)
	DECLARE @Return	nvarchar(4000)
	DECLARE @mLen int
	DECLARE @i int

	DECLARE @mDigit char(1)
	DECLARE @mTemp nvarchar(4000)
	DECLARE @mNumText nvarchar(4000)

	SELECT @sNumber=LTRIM(cast(@Number as nvarchar))
	SELECT @mLen = Len(@sNumber)

	if @mLen =2
		BEGIN
			SELECT @Return = N'Mười'
			RETURN @Return
		END
	SELECT @i=1
	SELECT @mTemp=''

	WHILE @i <= @mLen
		BEGIN

		SELECT @mDigit=SUBSTRING(@sNumber, @i, 1)

		IF @mDigit='0' SELECT @mNumText=N'không'
		ELSE
			BEGIN
			IF @mDigit='1' SELECT @mNumText=N'một'
			ELSE
			IF @mDigit='2' SELECT @mNumText=N'hai'
			ELSE
			IF @mDigit='3' SELECT @mNumText=N'ba'
			ELSE
			IF @mDigit='4' SELECT @mNumText=N'bốn'
			ELSE
			IF @mDigit='5' SELECT @mNumText=N'rưỡi'
			ELSE
			IF @mDigit='6' SELECT @mNumText=N'sáu'
			ELSE
			IF @mDigit='7' SELECT @mNumText=N'bảy'
			ELSE
			IF @mDigit='8' SELECT @mNumText=N'tám'
			ELSE
			IF @mDigit='9' SELECT @mNumText=N'chín'
			ELSE 
			IF @mDigit='.' SELECT @mNumText=N'điểm'
			END

		SELECT @mTemp = @mTemp + ' ' + @mNumText

		IF (@mLen = @i) BREAK
		
		IF @i =3
			SELECT @mTemp = @mTemp + N' mươi'
		SELECT @i=@i+1
		END


	SELECT @mTemp = Replace(@mTemp, N'không mươi ', N'không ')

	SELECT @mTemp = Replace(@mTemp, N'một mươi', N'mười')

	SELECT @mTemp = Replace(@mTemp, N'mươi năm', N'mươi lăm')

	--'Fix trường hợp x1, x>=2

	SELECT @mTemp = Replace(@mTemp, N'mươi một', N'mươi mốt')

	--'Fix trường hợp x15

	SELECT @mTemp = Replace(@mTemp, N'mười năm', N'mười lăm')

	--'Bỏ ký tự space

	SELECT @mTemp = LTrim(@mTemp)

	--'Ucase ký tự đầu tiên

	SELECT @Return=UPPER(Left(@mTemp, 1)) + SUBSTRING(@mTemp,2, 4000)

	RETURN @Return
END
GO
/****** Object:  Table [dbo].[BODE]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BODE](
	[IDCAUHOI] [int] IDENTITY(1,1) NOT NULL,
	[TRINHDO] [nchar](1) NOT NULL,
	[NOIDUNG] [nvarchar](max) NOT NULL,
	[DAP_AN] [nvarchar](30) NOT NULL,
	[MAMH] [nchar](15) NOT NULL,
	[MALOAICH] [nchar](15) NOT NULL,
	[MAGV] [nchar](15) NOT NULL,
 CONSTRAINT [PK_BODE] PRIMARY KEY CLUSTERED 
(
	[IDCAUHOI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CTBT]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CTBT](
	[IDDK] [int] NOT NULL,
	[IDCAUHOI] [int] NOT NULL,
	[STT] [int] NOT NULL,
	[LUACHONSV] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_CTBT] PRIMARY KEY CLUSTERED 
(
	[IDDK] ASC,
	[IDCAUHOI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DANGKY]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DANGKY](
	[IDDK] [int] IDENTITY(1,1) NOT NULL,
	[IDLMH] [int] NOT NULL,
	[MASV] [nchar](15) NOT NULL,
	[DIEM] [float] NOT NULL,
	[THOIGIANCONLAI_S] [int] NULL,
 CONSTRAINT [PK_DANGKY] PRIMARY KEY CLUSTERED 
(
	[IDDK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GIAOVIEN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GIAOVIEN](
	[MAGV] [nchar](15) NOT NULL,
	[HO] [nvarchar](50) NOT NULL,
	[TEN] [nvarchar](15) NOT NULL,
	[DIACHI] [nvarchar](200) NOT NULL,
	[SDT] [nchar](12) NOT NULL,
	[EMAIL] [nchar](50) NOT NULL,
	[MAKH] [nchar](15) NOT NULL,
 CONSTRAINT [PK_GIAOVIEN] PRIMARY KEY CLUSTERED 
(
	[MAGV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KHOA]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KHOA](
	[MAKH] [nchar](15) NOT NULL,
	[TENKH] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_KHOA] PRIMARY KEY CLUSTERED 
(
	[MAKH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LOAICAUHOI]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOAICAUHOI](
	[MALOAICH] [nchar](15) NOT NULL,
	[TENLOAICH] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_LOAICAUHOI] PRIMARY KEY CLUSTERED 
(
	[MALOAICH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LOPMONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOPMONHOC](
	[IDLMH] [int] IDENTITY(1,1) NOT NULL,
	[NIENKHOA] [nvarchar](10) NOT NULL,
	[HOCKY] [smallint] NOT NULL,
	[NHOM] [smallint] NOT NULL,
	[SOSVTT] [int] NOT NULL,
	[MAKH] [nchar](15) NOT NULL,
	[MAMH] [nchar](15) NOT NULL,
	[MAGV] [nchar](15) NOT NULL,
	[MAGVDK] [nchar](15) NULL,
	[TRINHDODK] [nchar](1) NULL,
	[NGAYTHI] [datetime] NULL,
	[SCT] [int] NULL,
	[THOIGIANTHI] [int] NULL,
	[TRANGTHAI] [smallint] NOT NULL,
 CONSTRAINT [PK_LOPMONHOC] PRIMARY KEY CLUSTERED 
(
	[IDLMH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LUACHON]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LUACHON](
	[IDLUACHON] [int] IDENTITY(1,1) NOT NULL,
	[STT] [nchar](1) NOT NULL,
	[NOIDUNG] [nvarchar](200) NOT NULL,
	[IDCAUHOI] [int] NOT NULL,
 CONSTRAINT [PK_LUACHON] PRIMARY KEY CLUSTERED 
(
	[IDLUACHON] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MONHOC](
	[MAMH] [nchar](15) NOT NULL,
	[TENMH] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_MONHOC] PRIMARY KEY CLUSTERED 
(
	[MAMH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NHOMQUYEN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NHOMQUYEN](
	[MANQ] [nchar](15) NOT NULL,
	[TENQUYEN] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_NHOMQUYEN] PRIMARY KEY CLUSTERED 
(
	[MANQ] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SINHVIEN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SINHVIEN](
	[MASV] [nchar](15) NOT NULL,
	[HO] [nvarchar](50) NOT NULL,
	[TEN] [nvarchar](15) NOT NULL,
	[NGAYSINH] [datetime] NOT NULL,
	[DIACHI] [nvarchar](200) NOT NULL,
	[EMAIL] [nchar](50) NOT NULL,
 CONSTRAINT [PK_SINHVIEN] PRIMARY KEY CLUSTERED 
(
	[MASV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TAIKHOAN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TAIKHOAN](
	[EMAIL] [nchar](50) NOT NULL,
	[PASSWORD] [nvarchar](50) NOT NULL,
	[MANQ] [nchar](15) NOT NULL,
	[REFRESH_TOKEN] [nvarchar](max) NULL,
 CONSTRAINT [PK_TAIKHOAN] PRIMARY KEY CLUSTERED 
(
	[EMAIL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TEMP_CTBT]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TEMP_CTBT](
	[IDDK] [int] NOT NULL,
	[IDCAUHOI] [int] NOT NULL,
	[STT] [int] NULL,
	[LUACHONSV] [nvarchar](30) NULL,
 CONSTRAINT [PK_TEMP_CTBT] PRIMARY KEY CLUSTERED 
(
	[IDDK] ASC,
	[IDCAUHOI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BODE] ON 

INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1, N'A', N'The publishers suggested that the envelopes be sent to ...... by courier so that the film can be developed as soon as possible.', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2, N'A', N'Board members ..... carefully define their goals and objectives for the agency before the monthly meeting next week.', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (3, N'A', N'For business relations to continue between our two firms, satisfactory agreement must be ...... reached and signer', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (4, N'A', N'The corporation, which underwent a major restructing seven years ago, has been growing steadily ......five years', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (5, N'A', N'Making advance arrangements for audiovisual equipment is....... recommended for all seminars.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (6, N'A', N'Two assistants will be required to ...... reporter''s names when they arrive at the press conference', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (7, N'A', N'The present government has an excellent ......to increase exports', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (8, N'A', N'While you are in the building, please wear your identification badge at all times so that you are ....... as a company employee.', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (9, N'A', N'Our studies show that increases in worker productivity have not been adequately .......rewarded by significant increases in ......', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (10, N'A', N'Conservatives predict that government finaces will remain...... during the period of the investigation', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (11, N'B', N'Battery-operated reading lamps......very well right now', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (12, N'B', N'In order to place a call outside the office, you have to .......nine first. ', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (13, N'B', N'We are pleased to inform...... that the missing order has been found.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (14, N'B', N'Unfortunately, neither Mr.Sachs....... Ms Flynn will be able to attend the awards banquet this evening', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (15, N'B', N'According to the manufacturer, the new generatir is capable of....... the amount of power consumed by our facility by nearly ten percent.', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (16, N'B', N'After the main course, choose from our wide....... of homemade deserts', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (17, N'B', N'One of the most frequent complaints among airline passengers is that there is not ...... legroom', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (18, N'B', N'Faculty members are planning to..... a party in honor of Dr.Walker, who will retire at the end of the semester', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (19, N'B', N'Many employees seem more ....... now about how to use the new telephone system than they did before they attended the workshop', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (20, N'B', N'.........our production figures improve in the near future, we foresee having to hire more people between now and July', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (21, N'C', N'Though their performance was relatively unpolished, the actors held the audience''s ........for the duration of the play.', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (22, N'C', N'Dr. Abernathy''s donation to Owstion College broke the record for the largest private gift...... give to the campus', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (23, N'C', N'Savat Nation Park is ....... by train,bus, charter plane, and rental car.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (24, N'C', N'In Piazzo''s lastest architectural project, he hopes to......his flare for blending contemporary and traditional ideals.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (25, N'C', N'Replacing the offic equipment that the company purchased only three years ago seems quite.....', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (26, N'C', N'On........, employees reach their peak performance level when they have been on the job for at least two years.', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (27, N'C', N'We were........unaware of the problems with the air-conidtioning units in the hotel rooms until this week.', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (28, N'C', N'If you send in an order ....... mail, we recommend that you phone our sales division directly to confirm the order.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (29, N'C', N'A recent global survey suggests.......... demand for aluminum and tin will remain at its current level for the next five to ten years.', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (30, N'C', N'Rates for the use of recreational facilities do not include ta and are subject to change without.........', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (31, N'A', N'Aswering telephone calls is the..... of an operator', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (32, N'A', N'A free watch will be provided with every purchase of $20.00 or more a ........ period of time', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (33, N'A', N'The president of the corporation has .......arrived in Copenhagen and will meet with the Minister of Trade on Monday morning', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (34, N'A', N'Because we value your business, we have .......for card members like you to receive one thousand  dollars of complimentary life insurance', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (35, N'A', N'Employees are........that due to the new government regulations. there is to be no smoking in the factory', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (36, N'A', N'MS. Galera gave a long...... in honor of the retiring vice-president', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (37, N'A', N'Any person who is........ in volunteering his or her time for the campaign should send this office a letter of intent', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (38, N'A', N'Mr.Gonzales was very concerned.........the upcoming board of directors meeting', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (39, N'A', N'The customers were told that no ........could be made on weekend nights because the restaurant was too busy', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (40, N'A', N'The sales representive''s presentation was difficult to understand ........ he spoke very quickly', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (41, N'B', N'It has been predicted that an.......weak dollar will stimulate tourism in the United States', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (42, N'B', N'The firm is not liable for damage resulting from circumstances.........its control.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (43, N'B', N'Because of.......weather conditions, California has an advantage in the production of fruits and vegetables', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (44, N'B', N'On international shipments, all duties and taxes are paid by the..........', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (45, N'B', N'Although the textbook gives a definitive answer,wise managers will look for........ own creative solutions', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (46, N'B', N'Initial ....... regarding the merger of the companies took place yesterday at the Plaza Conference Center.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (47, N'B', N'Please......... photocopies of all relevant docunments to this office ten days prior to your performance review date', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (48, N'B', N'The auditor''s results for the five year period under study were .........the accountant''s', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (49, N'B', N'.........has the marketing environment been more complex and subject to change', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (50, N'B', N'All full-time staff are eligible to participate in the revised health plan, which becomes effective the first ......... the month.', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (51, N'C', N'Contracts must be read........ before they are signed.', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (52, N'C', N'Passengers should allow for...... travel time to the airport in rush hour traffic', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (53, N'C', N'This fiscal year, the engineering team has worked well together on all phases ofproject.........', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (54, N'C', N'Mr.Dupont had no ....... how long it would take to drive downtown', N'C', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (55, N'C', N'Small company stocks usually benefit..........the so called January effect that cause the price of these stocks to rise between November and January', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (56, N'C', N'It has been suggested that employees ........to work in their current positions until the quarterly review is finished.', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (57, N'C', N'It is admirable that Ms.Jin wishes to handle all transactions by........, but it might be better if several people shared the responsibility', N'B', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (58, N'C', N'This new highway construction project will help the company.........', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (59, N'C', N'Ms.Patel has handed in an ........business plan to the director', N'D', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (60, N'C', N'Recent changes in heating oil costs have affected..........production of turniture', N'A', N'TA             ', N'NLC            ', N'GV01           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (121, N'A', N'Ten plus eleven = ?', N'21', N'TA             ', N'DK             ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (122, N'A', N'What is the fastest animal in the world?.', N'falcon', N'TA             ', N'DK             ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1132, N'A', N'3+5=?.', N'8', N'T1             ', N'DK             ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1139, N'A', N'5+5=?', N'A', N'T1             ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1140, N'A', N'Khi nghiệp vụ kinh tế chỉ ảnh hưởng bên nguồn vốn thì: ', N'A', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1141, N'A', N'Đối tượng kế toán nào sau đây là tài sản?', N'C', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1142, N'A', N'Bảng cân đối kế toán là bảng:', N'C', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1143, N'A', N'6+8=?', N'14', N'T1             ', N'DK             ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1144, N'A', N'8x9=?', N'B', N'T1             ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1145, N'A', N'9-4=?', N'B', N'T1             ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1146, N'B', N'Khoản mục “Hao mòn tài sản cố định” được trình bày trên:', N'B', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (1147, N'A', N'Định khoản trong kế toán là việc', N'C', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2343, N'A', N'rapid=?', N'rapid', N'NLKT           ', N'DK             ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2344, N'B', N'2+2=?', N'B', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2345, N'C', N'hello guy', N'C', N'NLKT           ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2349, N'A', N'1+1=?', N'2', N'T1             ', N'DK             ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2350, N'C', N'10+10=?', N'C', N'T1             ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2351, N'C', N'20+20=?', N'C', N'T1             ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2352, N'A', N'How are you?', N'A', N'TA             ', N'NLC            ', N'GV02           ')
INSERT [dbo].[BODE] ([IDCAUHOI], [TRINHDO], [NOIDUNG], [DAP_AN], [MAMH], [MALOAICH], [MAGV]) VALUES (2356, N'A', N'111', N'B', N'CSDL           ', N'NLC            ', N'GV02           ')
SET IDENTITY_INSERT [dbo].[BODE] OFF
GO
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 2, 6, N'B')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 3, 4, N'D')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 4, 10, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 7, 7, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 31, 8, N'D')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 34, 2, N'B')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 35, 5, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 36, 3, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 39, 1, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 121, 9, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 1, 4, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 2, 3, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 3, 2, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 6, 9, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 7, 8, N'B')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 10, 7, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 31, 5, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 32, 10, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 35, 6, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (24, 37, 1, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (25, 3, 2, N'B')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (25, 5, 3, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (25, 10, 5, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (25, 31, 1, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (25, 32, 4, N'D')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (26, 1, 5, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (26, 2, 4, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (26, 4, 1, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (26, 9, 3, N'D')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (26, 37, 2, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 2, 5, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 4, 2, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 6, 4, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 37, 3, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 40, 1, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 2, 8, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 4, 5, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 7, 2, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 10, 6, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 31, 3, N'B')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 35, 10, N'A')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 37, 9, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 38, 4, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 121, 7, N'21')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 2352, 1, N'D')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 1, 4, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 4, 7, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 7, 5, N'B')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 8, 3, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 33, 8, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 34, 2, N'C')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 35, 10, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 38, 6, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 40, 9, N'')
INSERT [dbo].[CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 2352, 1, N'A')
GO
SET IDENTITY_INSERT [dbo].[DANGKY] ON 

INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (22, 20, N'SV001          ', 4, 180)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (23, 20, N'SV002          ', 0, 150)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (24, 1, N'SV001          ', 0, 570)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (25, 27, N'SV001          ', 0, 200)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (26, 27, N'SV002          ', 2, 150)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (27, 27, N'SV004          ', 2, 300)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (28, 28, N'SV004          ', 2, 3570)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (29, 28, N'SV001          ', 3, 0)
INSERT [dbo].[DANGKY] ([IDDK], [IDLMH], [MASV], [DIEM], [THOIGIANCONLAI_S]) VALUES (30, 28, N'SV002          ', 0, 3260)
SET IDENTITY_INSERT [dbo].[DANGKY] OFF
GO
INSERT [dbo].[GIAOVIEN] ([MAGV], [HO], [TEN], [DIACHI], [SDT], [EMAIL], [MAKH]) VALUES (N'GV01           ', N'Nguyễn', N'A', N'TPHCM', N'0912345678  ', N'nguyena@gmail.com                                 ', N'CNTT           ')
INSERT [dbo].[GIAOVIEN] ([MAGV], [HO], [TEN], [DIACHI], [SDT], [EMAIL], [MAKH]) VALUES (N'GV02           ', N'Trần', N'B', N'TPHCM.', N'0998765432  ', N'tranb@gmail.com                                   ', N'DT             ')
INSERT [dbo].[GIAOVIEN] ([MAGV], [HO], [TEN], [DIACHI], [SDT], [EMAIL], [MAKH]) VALUES (N'GV03           ', N'Nguyễn Văn', N'Anh', N'TP Hà Nội', N'0988888888  ', N'nguyenanhanoi@gmail.com                           ', N'VT             ')
INSERT [dbo].[GIAOVIEN] ([MAGV], [HO], [TEN], [DIACHI], [SDT], [EMAIL], [MAKH]) VALUES (N'GV04           ', N'Lê', N'Nam', N'TPHCM', N'0945678912  ', N'lenam@gmail.com                                   ', N'KT             ')
INSERT [dbo].[GIAOVIEN] ([MAGV], [HO], [TEN], [DIACHI], [SDT], [EMAIL], [MAKH]) VALUES (N'GV05           ', N'Nguyễn', N'Lê', N'TPHCM', N'0987455555  ', N'nguyenle@gmail.com                                ', N'CNTT           ')
INSERT [dbo].[GIAOVIEN] ([MAGV], [HO], [TEN], [DIACHI], [SDT], [EMAIL], [MAKH]) VALUES (N'GV09           ', N'Lê', N'Như', N'HN', N'0888888888  ', N'lenhu@gmail.com                                   ', N'CNTT           ')
GO
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'CNTT           ', N'Công nghệ thông tin')
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'DT             ', N'Điện tử 1')
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'KT             ', N'Kế toán')
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'MKT            ', N'Marketing')
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'THCS           ', N'Tin học cơ sở')
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'THCS2          ', N'Tin học cơ sở 2')
INSERT [dbo].[KHOA] ([MAKH], [TENKH]) VALUES (N'VT             ', N'Viễn thông')
GO
INSERT [dbo].[LOAICAUHOI] ([MALOAICH], [TENLOAICH]) VALUES (N'DK             ', N'Điền khuyết')
INSERT [dbo].[LOAICAUHOI] ([MALOAICH], [TENLOAICH]) VALUES (N'NLC            ', N'Nhiều lựa chọn')
GO
SET IDENTITY_INSERT [dbo].[LOPMONHOC] ON 

INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (1, N'2020-2021', 1, 1, 15, N'CNTT           ', N'TA             ', N'GV02           ', N'GV02           ', N'A', CAST(N'2021-12-13T00:00:00.000' AS DateTime), 10, 10, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (4, N'2020-2021', 2, 1, 25, N'KT             ', N'NLKT           ', N'GV03           ', NULL, N'#', NULL, NULL, NULL, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (5, N'2020-2021', 1, 2, 11, N'CNTT           ', N'T1             ', N'GV04           ', NULL, N'#', NULL, NULL, NULL, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (6, N'2020-2021', 1, 3, 20, N'CNTT           ', N'TA             ', N'GV02           ', NULL, N'#', NULL, NULL, NULL, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (15, N'2020-2021', 1, 3, 3, N'CNTT           ', N'NLKT           ', N'GV01           ', NULL, N'#', NULL, NULL, NULL, 0)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (18, N'2020-2021', 1, 2, 11, N'CNTT           ', N'TA             ', N'GV03           ', NULL, N'#', NULL, NULL, NULL, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (19, N'2020-2021', 1, 22, 2, N'CNTT           ', N'TA             ', N'GV03           ', N'GV02           ', N'A', CAST(N'2021-12-13T00:00:00.000' AS DateTime), 5, 22, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (20, N'2020-2021', 1, 10, 11, N'KT             ', N'TA             ', N'GV01           ', N'GV02           ', N'A', CAST(N'2021-11-27T00:00:00.000' AS DateTime), 10, 3, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (27, N'2021-2022', 1, 1, 10, N'CNTT           ', N'TA             ', N'GV01           ', N'GV02           ', N'A', CAST(N'2021-12-13T00:00:00.000' AS DateTime), 5, 5, 1)
INSERT [dbo].[LOPMONHOC] ([IDLMH], [NIENKHOA], [HOCKY], [NHOM], [SOSVTT], [MAKH], [MAMH], [MAGV], [MAGVDK], [TRINHDODK], [NGAYTHI], [SCT], [THOIGIANTHI], [TRANGTHAI]) VALUES (28, N'2021-2022', 1, 2, 10, N'CNTT           ', N'TA             ', N'GV01           ', N'GV02           ', N'A', CAST(N'2021-12-14T00:00:00.000' AS DateTime), 10, 60, 1)
SET IDENTITY_INSERT [dbo].[LOPMONHOC] OFF
GO
SET IDENTITY_INSERT [dbo].[LUACHON] ON 

INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1, N'A', N'they', 1)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2, N'B', N'their', 1)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (3, N'C', N'theirs', 1)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (4, N'D', N'them', 1)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (5, N'A', N'had', 2)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (6, N'B', N'should', 2)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (7, N'C', N'used', 2)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (8, N'D', N'have', 2)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (9, N'A', N'yet', 3)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (10, N'B', N'both', 3)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (11, N'C', N'either', 3)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (12, N'D', N'as well as', 3)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (13, N'A', N'for', 4)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (14, N'B', N'on', 4)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (15, N'C', N'from', 4)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (16, N'D', N'since', 4)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (17, N'A', N'sternly', 5)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (18, N'B', N'strikingly', 5)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (19, N'C', N'stringently', 5)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (20, N'D', N'strongly', 5)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (21, N'A', N'remark', 6)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (22, N'B', N'check', 6)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (23, N'C', N'notify', 6)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (24, N'D', N'ensure', 6)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (25, N'A', N'popularity', 7)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (26, N'B', N'regularity', 7)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (27, N'C', N'celebrity', 7)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (28, N'D', N'opportunity', 7)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (29, N'A', N'recognize', 8)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (30, N'B', N'recognizing', 8)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (31, N'C', N'recognizable', 8)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (32, N'D', N'recognizably', 8)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (33, N'A', N'compensation', 9)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (34, N'B', N'commodity', 9)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (35, N'C', N'compilation', 9)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (36, N'D', N'complacency', 9)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (37, N'A', N'authoritative', 10)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (38, N'B', N'summarized', 10)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (39, N'C', N'examined', 10)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (40, N'D', N'stable', 10)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (41, N'A', N'sale', 11)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (42, N'B', N'sold', 11)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (43, N'C', N'are selling', 11)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (44, N'D', N'were sold', 11)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (45, N'A', N'tip', 12)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (46, N'B', N'make', 12)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (47, N'C', N'dial', 12)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (48, N'D', N'number', 12)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (49, N'A', N'you', 13)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (50, N'B', N'your', 13)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (51, N'C', N'yours', 13)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (52, N'D', N'yourseld', 13)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (53, N'A', N'but', 14)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (54, N'B', N'and', 14)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (55, N'C', N'nor', 14)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (56, N'D', N'either', 14)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (57, N'A', N'reduced', 15)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (58, N'B', N'reducing', 15)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (59, N'C', N'reduce', 15)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (60, N'D', N'', 15)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (61, N'A', N'varied', 16)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (62, N'B', N'various', 16)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (63, N'C', N'vary', 16)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (64, N'D', N'variety', 16)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (65, N'A', N'enough', 17)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (66, N'B', N'many', 17)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (67, N'C', N'very', 17)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (68, N'D', N'plenty', 17)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (69, N'A', N'carry', 18)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (70, N'B', N'do', 18)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (71, N'C', N'hold', 18)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (72, N'D', N'take', 18)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (73, N'A', N'confusion', 19)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (74, N'B', N'confuse', 19)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (75, N'C', N'confused', 19)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (76, N'D', N'confusing', 19)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (77, N'A', N'During', 20)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (78, N'B', N'Only', 20)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (79, N'C', N'Unless', 20)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (80, N'D', N'Because', 20)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (81, N'A', N'attentive', 21)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (82, N'B', N'attentively', 21)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (83, N'C', N'attention', 21)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (84, N'D', N'attentiveness', 21)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (85, N'A', N'always', 22)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (86, N'B', N'rarely', 22)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (87, N'C', N'once', 22)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (88, N'D', N'ever', 22)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (89, N'A', N'accessible', 23)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (90, N'B', N'accessing', 23)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (91, N'C', N'accessibility', 23)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (92, N'D', N'accesses', 23)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (93, N'A', N'demonstrate', 24)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (94, N'B', N'appear', 24)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (95, N'C', N'valve', 24)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (96, N'D', N'position', 24)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (97, N'A', N'waste', 25)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (98, N'B', N'wasteful', 25)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (99, N'C', N'wasting', 25)
GO
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (100, N'D', N'wasted', 25)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (101, N'A', N'common', 26)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (102, N'B', N'standard', 26)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (103, N'C', N'average', 26)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (104, N'D', N'general', 26)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (105, N'A', N'complete', 27)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (106, N'B', N'completely', 27)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (107, N'C', N'completed', 27)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (108, N'D', N'completing', 27)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (109, N'A', N'near', 28)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (110, N'B', N'by', 28)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (111, N'C', N'for', 28)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (112, N'D', N'on', 28)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (113, N'A', N'which', 29)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (114, N'B', N'it', 29)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (115, N'C', N'that', 29)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (116, N'D', N'both', 29)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (117, N'A', N'signal', 30)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (118, N'B', N'cash', 30)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (119, N'C', N'report', 30)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (120, N'D', N'notice', 30)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (121, N'A', N'responsible', 31)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (122, N'B', N'responsibly', 31)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (123, N'C', N'responsive', 31)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (124, N'D', N'responsibility', 31)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (125, N'A', N'limit', 32)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (126, N'B', N'limits', 32)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (127, N'C', N'limited', 32)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (128, N'D', N'limiting', 32)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (129, N'A', N'still', 33)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (130, N'B', N'yet', 33)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (131, N'C', N'already', 33)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (132, N'D', N'soon', 33)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (133, N'A', N'arrange', 34)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (134, N'B', N'arranged', 34)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (135, N'C', N'arranges', 34)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (136, N'D', N'arranging', 34)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (137, N'A', N'reminded', 35)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (138, N'B', N'respected', 35)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (139, N'C', N'remembered', 35)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (140, N'D', N'reacted', 35)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (141, N'A', N'speak', 36)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (142, N'B', N'speaker', 36)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (143, N'C', N'speaking', 36)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (144, N'D', N'speech', 36)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (145, N'A', N'interest', 37)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (146, N'B', N'interested', 37)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (147, N'C', N'interesting', 37)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (148, N'D', N'interestingly', 37)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (149, N'A', N'to', 38)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (150, N'B', N'about', 38)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (151, N'C', N'at', 38)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (152, N'D', N'upon', 38)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (153, N'A', N'delays', 39)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (154, N'B', N'cuisines', 39)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (155, N'C', N'reservation', 39)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (156, N'D', N'violations', 39)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (157, N'A', N'because', 40)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (158, N'B', N'althought', 40)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (159, N'C', N'so that', 40)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (160, N'D', N'than', 40)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (161, N'A', N'increased', 41)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (162, N'B', N'increasingly', 41)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (163, N'C', N'increases', 41)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (164, N'D', N'increase', 41)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (165, N'A', N'beyond', 42)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (166, N'B', N'above', 42)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (167, N'C', N'inside', 42)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (168, N'D', N'around', 42)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (169, N'A', N'favorite', 43)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (170, N'B', N'favor', 43)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (171, N'C', N'favorable', 43)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (172, N'D', N'favorably', 43)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (173, N'A', N'recipient', 44)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (174, N'B', N'receiving', 44)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (175, N'C', N'receipt', 44)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (176, N'D', N'receptive', 44)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (177, N'A', N'them', 45)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (178, N'B', N'their', 45)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (179, N'C', N'theirs', 45)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (180, N'D', N'they', 45)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (181, N'A', N'negotiations', 46)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (182, N'B', N'dedications', 46)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (183, N'C', N'propositions', 46)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (184, N'D', N'announcements', 46)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (185, N'A', N'emerge', 47)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (186, N'B', N'substantiate', 47)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (187, N'C', N'adapt', 47)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (188, N'D', N'submit', 47)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (189, N'A', N'same', 48)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (190, N'B', N'same as', 48)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (191, N'C', N'the same', 48)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (192, N'D', N'the same as', 48)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (193, N'A', N'Totally', 49)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (194, N'B', N'Negatively', 49)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (195, N'C', N'Decidedly', 49)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (196, N'D', N'Rarely', 49)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (197, N'A', N'of', 50)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (198, N'B', N'to', 50)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (199, N'C', N'from', 50)
GO
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (200, N'D', N'for', 50)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (201, N'A', N'thoroughness', 51)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (202, N'B', N'more thorough', 51)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (203, N'C', N'thorough', 51)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (204, N'D', N'thoroughly', 51)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (205, N'A', N'addition', 52)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (206, N'B', N'additive', 52)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (207, N'C', N'additionally', 52)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (208, N'D', N'additional', 52)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (209, N'A', N'development', 53)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (210, N'B', N'developed', 53)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (211, N'C', N'develops', 53)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (212, N'D', N'developer', 53)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (213, N'A', N'knowledge', 54)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (214, N'B', N'thought', 54)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (215, N'C', N'idea', 54)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (216, N'D', N'willingness', 54)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (217, N'A', N'unless', 55)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (218, N'B', N'from', 55)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (219, N'C', N'to', 55)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (220, N'D', N'since', 55)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (221, N'A', N'continuity', 56)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (222, N'B', N'continue', 56)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (223, N'C', N'continuing', 56)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (224, N'D', N'continuous', 56)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (225, N'A', N'she', 57)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (226, N'B', N'herself', 57)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (227, N'C', N'her', 57)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (228, N'D', N'hers', 57)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (229, N'A', N'diversity', 58)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (230, N'B', N'clarify', 58)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (231, N'C', N'intensify', 58)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (232, N'D', N'modify', 58)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (233, N'A', N'anxious', 59)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (234, N'B', N'evident', 59)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (235, N'C', N'eager', 59)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (236, N'D', N'outstanding', 59)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (237, N'A', N'local', 60)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (238, N'B', N'locality', 60)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (239, N'C', N'locally', 60)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (240, N'D', N'location', 60)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1269, N'A', N'Nguồn vốn này tăng sẽ có nguồn vốn khác giảm tương ứng', 1140)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1270, N'B', N'Tổng số tiền bên tài sản thay đổi', 1140)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1271, N'C', N'Tổng số tiền bên nguồn vốn giảm đi', 1140)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1272, N'D', N'Không có đáp án nào đúng', 1140)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1273, N'A', N'Phải trả nhà người bán', 1141)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1274, N'B', N'Quỹ khen thưởng phúc lợi', 1141)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1275, N'C', N'Thuế GTGT được khấu trừ', 1141)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1276, N'D', N'Lợi nhuận chưa phân phối', 1141)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1286, N'A', N'1', 1145)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1287, N'B', N'5', 1145)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1288, N'C', N'4', 1145)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1289, N'D', N'2', 1145)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1290, N'A', N'Bảng cân đối kế toán, phần nguồn vốn', 1146)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1291, N'B', N'Bảng cân đối kế toán, phần tài sản', 1146)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1292, N'C', N'Báo cáo kết quả kinh doanh', 1146)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1293, N'D', N'Báo cáo lưu chuyển tiền tệ', 1146)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1294, N'A', N'Ghi số phát sinh của nghiệp vụ kinh tế phát sinh vào các tài khoản có liên quan', 1147)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1295, N'B', N'Ghi số dư cuối kỳ vào các tài khoản có liên quan', 1147)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1296, N'C', N'Kế toán phân tích các nghiệp vụ kinh tế phát sinh và ghi theo quan hệ Nợ, Có của các tài khoản có liên quan', 1147)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (1297, N'D', N'Ghi số dư đầu kỳ vào các tài khoản có liên quan', 1147)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2828, N'A', N'10', 1139)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2829, N'B', N'5', 1139)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2830, N'C', N'2', 1139)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2831, N'A', N'2', 2344)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2832, N'B', N'4', 2344)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2833, N'C', N'3', 2344)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2834, N'D', N'x', 2344)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2835, N'A', N'they', 2345)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2836, N'B', N'their', 2345)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2837, N'C', N'theirs', 2345)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2838, N'D', N'them', 2345)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2873, N'A', N'10', 2350)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2874, N'B', N'15', 2350)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2875, N'C', N'20', 2350)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2876, N'D', N'25', 2350)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2881, N'A', N'I''m fine', 2352)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2882, N'B', N'ok', 2352)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2883, N'C', N'hello', 2352)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2884, N'D', N'bye bye', 2352)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2885, N'E', N'No', 2352)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2886, N'F', N'yes', 2352)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2903, N'A', N'10', 2351)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2904, N'B', N'25', 2351)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2905, N'C', N'30', 2351)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2906, N'D', N'45', 2351)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2907, N'A', N'Tùy chọn 1', 2356)
INSERT [dbo].[LUACHON] ([IDLUACHON], [STT], [NOIDUNG], [IDCAUHOI]) VALUES (2908, N'B', N'Tùy chọn 2', 2356)
SET IDENTITY_INSERT [dbo].[LUACHON] OFF
GO
INSERT [dbo].[MONHOC] ([MAMH], [TENMH]) VALUES (N'CSDL           ', N'Cơ sở dữ liệu')
INSERT [dbo].[MONHOC] ([MAMH], [TENMH]) VALUES (N'NLKT           ', N'Nguyên lý kế toán')
INSERT [dbo].[MONHOC] ([MAMH], [TENMH]) VALUES (N'TA             ', N'Tiếng Anh')
INSERT [dbo].[MONHOC] ([MAMH], [TENMH]) VALUES (N'T1             ', N'Toán 1')
INSERT [dbo].[MONHOC] ([MAMH], [TENMH]) VALUES (N'T2             ', N'Toán 2')
GO
INSERT [dbo].[NHOMQUYEN] ([MANQ], [TENQUYEN]) VALUES (N'admin          ', N'admin')
INSERT [dbo].[NHOMQUYEN] ([MANQ], [TENQUYEN]) VALUES (N'GV             ', N'Giáo viên')
INSERT [dbo].[NHOMQUYEN] ([MANQ], [TENQUYEN]) VALUES (N'PGV            ', N'Phòng giáo vụ')
INSERT [dbo].[NHOMQUYEN] ([MANQ], [TENQUYEN]) VALUES (N'SV             ', N'Sinh viên')
GO
INSERT [dbo].[SINHVIEN] ([MASV], [HO], [TEN], [NGAYSINH], [DIACHI], [EMAIL]) VALUES (N'SV001          ', N'Nguyễn Văn', N'Một', CAST(N'1999-01-02T00:00:00.000' AS DateTime), N'TPHCM', N'sv001@gmail.com                                   ')
INSERT [dbo].[SINHVIEN] ([MASV], [HO], [TEN], [NGAYSINH], [DIACHI], [EMAIL]) VALUES (N'SV002          ', N'Trần Văn', N'Hai', CAST(N'1999-12-05T00:00:00.000' AS DateTime), N'TPHCM', N'sv002@gmail.com                                   ')
INSERT [dbo].[SINHVIEN] ([MASV], [HO], [TEN], [NGAYSINH], [DIACHI], [EMAIL]) VALUES (N'SV004          ', N'Trần', N'Minh', CAST(N'2003-12-09T00:00:00.000' AS DateTime), N'HANOI', N'sv003@gmail.com                                   ')
INSERT [dbo].[SINHVIEN] ([MASV], [HO], [TEN], [NGAYSINH], [DIACHI], [EMAIL]) VALUES (N'SV006          ', N'Lê', N'Sáu', CAST(N'2003-11-13T00:00:00.000' AS DateTime), N'Kiên Giang', N'sv006@gmail.com                                   ')
GO
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'admin@gmail.com                                   ', N'123', N'admin          ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'lenam@gmail.com                                   ', N'123', N'GV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'lenhu@gmail.com                                   ', N'123', N'GV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'nguyena@gmail.com                                 ', N'123', N'PGV            ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'nguyenanhanoi@gmail.com                           ', N'123', N'GV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'nguyenle@gmail.com                                ', N'123', N'GV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'sv001@gmail.com                                   ', N'123', N'SV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'sv002@gmail.com                                   ', N'123', N'SV             ', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNQVNWIjoiU1YwMDIgICAgICAgICAgIiwiRU1BSUwiOiJzdjAwMkBnbWFpbC5jb20gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsIk1BTlEiOiJTViAgICAgICAgICAgICAiLCJpYXQiOjE2Mzk0ODI1MjMsImV4cCI6MTYzOTU2ODkyM30.HBFtQGxWPt4PbPwBBYlXr4JS3PNZGJxYXnJ1WJpoDMg')
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'sv003@gmail.com                                   ', N'123', N'SV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'sv006@gmail.com                                   ', N'123', N'SV             ', NULL)
INSERT [dbo].[TAIKHOAN] ([EMAIL], [PASSWORD], [MANQ], [REFRESH_TOKEN]) VALUES (N'tranb@gmail.com                                   ', N'123', N'PGV            ', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNQUdWIjoiR1YwMiAgICAgICAgICAgIiwiRU1BSUwiOiJ0cmFuYkBnbWFpbC5jb20gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsIk1BTlEiOiJQR1YgICAgICAgICAgICAiLCJpYXQiOjE2Mzk0ODIxNDcsImV4cCI6MTYzOTU2ODU0N30.ia1JTyQ6qGkdjSHJtKsv13FezHiKJ7IG55lVZG3gBvA')
GO
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 4, 4, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 5, 6, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 7, 7, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 9, 10, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 33, 2, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 34, 8, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 36, 5, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 39, 9, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 40, 1, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (22, 122, 3, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 5, 7, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 8, 9, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 9, 10, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 32, 5, N'A')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 33, 2, N'C')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 34, 8, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 36, 6, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 40, 1, N'D')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 121, 3, N'21')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (23, 122, 4, N'falcon')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 2, 1, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 8, 2, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 32, 5, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 38, 3, N'C')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (27, 39, 4, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 2, 6, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 4, 7, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 5, 10, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 10, 5, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 35, 4, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 37, 2, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 38, 3, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 121, 1, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 122, 8, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (28, 2352, 9, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 2, 8, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 6, 7, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 7, 9, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 8, 10, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 9, 6, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 32, 3, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 34, 5, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 37, 1, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 38, 4, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (29, 121, 2, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 1, 3, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 4, 5, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 5, 10, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 6, 2, N'C')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 8, 1, N'A')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 10, 7, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 34, 8, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 37, 9, N'')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 122, 4, N'fal')
INSERT [dbo].[TEMP_CTBT] ([IDDK], [IDCAUHOI], [STT], [LUACHONSV]) VALUES (30, 2352, 6, N'')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_DANGKY]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[DANGKY] ADD  CONSTRAINT [UK_DANGKY] UNIQUE NONCLUSTERED 
(
	[IDLMH] ASC,
	[MASV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_SDT]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[GIAOVIEN] ADD  CONSTRAINT [UK_SDT] UNIQUE NONCLUSTERED 
(
	[SDT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_KHOA]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[KHOA] ADD  CONSTRAINT [UK_KHOA] UNIQUE NONCLUSTERED 
(
	[TENKH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_LOAICAUHOI]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[LOAICAUHOI] ADD  CONSTRAINT [UK_LOAICAUHOI] UNIQUE NONCLUSTERED 
(
	[TENLOAICH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_LOPMONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[LOPMONHOC] ADD  CONSTRAINT [UK_LOPMONHOC] UNIQUE NONCLUSTERED 
(
	[HOCKY] ASC,
	[MAMH] ASC,
	[NHOM] ASC,
	[NIENKHOA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_LUACHON]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[LUACHON] ADD  CONSTRAINT [IX_LUACHON] UNIQUE NONCLUSTERED 
(
	[IDCAUHOI] ASC,
	[STT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_MONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[MONHOC] ADD  CONSTRAINT [UK_MONHOC] UNIQUE NONCLUSTERED 
(
	[TENMH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_NHOMQUYEN]    Script Date: 14/12/2021 7:42:15 CH ******/
ALTER TABLE [dbo].[NHOMQUYEN] ADD  CONSTRAINT [UK_NHOMQUYEN] UNIQUE NONCLUSTERED 
(
	[TENQUYEN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DANGKY] ADD  CONSTRAINT [DF_DANGKY_DIEM]  DEFAULT ((0)) FOR [DIEM]
GO
ALTER TABLE [dbo].[BODE]  WITH CHECK ADD  CONSTRAINT [FK_BODE_GIAOVIEN] FOREIGN KEY([MAGV])
REFERENCES [dbo].[GIAOVIEN] ([MAGV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BODE] CHECK CONSTRAINT [FK_BODE_GIAOVIEN]
GO
ALTER TABLE [dbo].[BODE]  WITH CHECK ADD  CONSTRAINT [FK_BODE_LOAICAUHOI] FOREIGN KEY([MALOAICH])
REFERENCES [dbo].[LOAICAUHOI] ([MALOAICH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BODE] CHECK CONSTRAINT [FK_BODE_LOAICAUHOI]
GO
ALTER TABLE [dbo].[BODE]  WITH CHECK ADD  CONSTRAINT [FK_BODE_MONHOC] FOREIGN KEY([MAMH])
REFERENCES [dbo].[MONHOC] ([MAMH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BODE] CHECK CONSTRAINT [FK_BODE_MONHOC]
GO
ALTER TABLE [dbo].[CTBT]  WITH CHECK ADD  CONSTRAINT [FK_CTBT_BODE] FOREIGN KEY([IDCAUHOI])
REFERENCES [dbo].[BODE] ([IDCAUHOI])
GO
ALTER TABLE [dbo].[CTBT] CHECK CONSTRAINT [FK_CTBT_BODE]
GO
ALTER TABLE [dbo].[CTBT]  WITH CHECK ADD  CONSTRAINT [FK_CTBT_DANGKY] FOREIGN KEY([IDDK])
REFERENCES [dbo].[DANGKY] ([IDDK])
GO
ALTER TABLE [dbo].[CTBT] CHECK CONSTRAINT [FK_CTBT_DANGKY]
GO
ALTER TABLE [dbo].[DANGKY]  WITH CHECK ADD  CONSTRAINT [FK_DANGKY_LOPMONHOC] FOREIGN KEY([IDLMH])
REFERENCES [dbo].[LOPMONHOC] ([IDLMH])
GO
ALTER TABLE [dbo].[DANGKY] CHECK CONSTRAINT [FK_DANGKY_LOPMONHOC]
GO
ALTER TABLE [dbo].[DANGKY]  WITH CHECK ADD  CONSTRAINT [FK_DANGKY_SINHVIEN] FOREIGN KEY([MASV])
REFERENCES [dbo].[SINHVIEN] ([MASV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[DANGKY] CHECK CONSTRAINT [FK_DANGKY_SINHVIEN]
GO
ALTER TABLE [dbo].[GIAOVIEN]  WITH CHECK ADD  CONSTRAINT [FK_GIAOVIEN_KHOA] FOREIGN KEY([MAKH])
REFERENCES [dbo].[KHOA] ([MAKH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[GIAOVIEN] CHECK CONSTRAINT [FK_GIAOVIEN_KHOA]
GO
ALTER TABLE [dbo].[GIAOVIEN]  WITH CHECK ADD  CONSTRAINT [FK_GIAOVIEN_TAIKHOAN] FOREIGN KEY([EMAIL])
REFERENCES [dbo].[TAIKHOAN] ([EMAIL])
GO
ALTER TABLE [dbo].[GIAOVIEN] CHECK CONSTRAINT [FK_GIAOVIEN_TAIKHOAN]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH CHECK ADD  CONSTRAINT [FK_LOPMONHOC_GIAOVIEN] FOREIGN KEY([MAGV])
REFERENCES [dbo].[GIAOVIEN] ([MAGV])
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [FK_LOPMONHOC_GIAOVIEN]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH CHECK ADD  CONSTRAINT [FK_LOPMONHOC_GIAOVIEN1] FOREIGN KEY([MAGVDK])
REFERENCES [dbo].[GIAOVIEN] ([MAGV])
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [FK_LOPMONHOC_GIAOVIEN1]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH CHECK ADD  CONSTRAINT [FK_LOPMONHOC_KHOA] FOREIGN KEY([MAKH])
REFERENCES [dbo].[KHOA] ([MAKH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [FK_LOPMONHOC_KHOA]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH CHECK ADD  CONSTRAINT [FK_LOPMONHOC_MONHOC] FOREIGN KEY([MAMH])
REFERENCES [dbo].[MONHOC] ([MAMH])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [FK_LOPMONHOC_MONHOC]
GO
ALTER TABLE [dbo].[LUACHON]  WITH CHECK ADD  CONSTRAINT [FK_LUACHON_BODE] FOREIGN KEY([IDCAUHOI])
REFERENCES [dbo].[BODE] ([IDCAUHOI])
GO
ALTER TABLE [dbo].[LUACHON] CHECK CONSTRAINT [FK_LUACHON_BODE]
GO
ALTER TABLE [dbo].[SINHVIEN]  WITH CHECK ADD  CONSTRAINT [FK_SINHVIEN_TAIKHOAN] FOREIGN KEY([EMAIL])
REFERENCES [dbo].[TAIKHOAN] ([EMAIL])
GO
ALTER TABLE [dbo].[SINHVIEN] CHECK CONSTRAINT [FK_SINHVIEN_TAIKHOAN]
GO
ALTER TABLE [dbo].[TAIKHOAN]  WITH CHECK ADD  CONSTRAINT [FK_TAIKHOAN_NHOMQUYEN] FOREIGN KEY([MANQ])
REFERENCES [dbo].[NHOMQUYEN] ([MANQ])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[TAIKHOAN] CHECK CONSTRAINT [FK_TAIKHOAN_NHOMQUYEN]
GO
ALTER TABLE [dbo].[BODE]  WITH NOCHECK ADD  CONSTRAINT [CK_TRINHDO] CHECK  (([TRINHDO]='A' OR [TRINHDO]='B' OR [TRINHDO]='C'))
GO
ALTER TABLE [dbo].[BODE] CHECK CONSTRAINT [CK_TRINHDO]
GO
ALTER TABLE [dbo].[CTBT]  WITH NOCHECK ADD  CONSTRAINT [CK_CTBT_STT] CHECK  (([STT]>=(1)))
GO
ALTER TABLE [dbo].[CTBT] CHECK CONSTRAINT [CK_CTBT_STT]
GO
ALTER TABLE [dbo].[DANGKY]  WITH NOCHECK ADD  CONSTRAINT [CK_DIEM] CHECK  (([DIEM]>=(0) AND [DIEM]<=(10)))
GO
ALTER TABLE [dbo].[DANGKY] CHECK CONSTRAINT [CK_DIEM]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH NOCHECK ADD  CONSTRAINT [CK_LOPMONHOC_HOCKY] CHECK  (([HOCKY]>=(1) AND [HOCKY]<=(2)))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_HOCKY]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH NOCHECK ADD  CONSTRAINT [CK_LOPMONHOC_NHOM] CHECK  (([NHOM]>=(1)))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_NHOM]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH NOCHECK ADD  CONSTRAINT [CK_LOPMONHOC_SCT] CHECK  (([SCT]>=(1)))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_SCT]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH NOCHECK ADD  CONSTRAINT [CK_LOPMONHOC_SOSVTT] CHECK  (([SOSVTT]>=(1)))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_SOSVTT]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH NOCHECK ADD  CONSTRAINT [CK_LOPMONHOC_THOIGIANTHI] CHECK  (([THOIGIANTHI]>=(1)))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_THOIGIANTHI]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH CHECK ADD  CONSTRAINT [CK_LOPMONHOC_TRANGTHAI] CHECK  (([TRANGTHAI]>=(0) AND [TRANGTHAI]<=(1)))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_TRANGTHAI]
GO
ALTER TABLE [dbo].[LOPMONHOC]  WITH NOCHECK ADD  CONSTRAINT [CK_LOPMONHOC_TRINHDODK] CHECK  (([TRINHDODK]='A' OR [TRINHDODK]='B' OR [TRINHDODK]='C' OR [TRINHDODK]='#'))
GO
ALTER TABLE [dbo].[LOPMONHOC] CHECK CONSTRAINT [CK_LOPMONHOC_TRINHDODK]
GO
ALTER TABLE [dbo].[LUACHON]  WITH CHECK ADD  CONSTRAINT [CK_LUACHON_STT] CHECK  (([STT]='A' OR [STT]='B' OR [STT]='C' OR [STT]='D' OR [STT]='E' OR [STT]='F'))
GO
ALTER TABLE [dbo].[LUACHON] CHECK CONSTRAINT [CK_LUACHON_STT]
GO
/****** Object:  StoredProcedure [dbo].[CursorBoDeExcel]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CursorBoDeExcel] @OutCrsr CURSOR varying OUTPUT, @caccauhoi CauHoiType readonly
	
AS
    SET @OutCrsr = CURSOR KEYSET FOR
    SELECT IDX, TRINHDO, NOIDUNG, DAP_AN, MALOAICH
	from(select IDX, TRINHDO, NOIDUNG, DAP_AN, MALOAICH,
		ROW_NUMBER() over (PARTITION by NOIDUNG,TRINHDO,DAP_AN,MALOAICH order by idx) as rn
		from @caccauhoi
	)a
	where rn=1
	order by idx
  OPEN @OutCrsr
GO
/****** Object:  StoredProcedure [dbo].[SP_CANCEL_LOPMONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CANCEL_LOPMONHOC] 
	@idlmh int
	
AS

	if exists(select 1 from LOPMONHOC 
	where IDLMH=@idlmh and IDLMH in (select IDLMH from DANGKY,CTBT where DANGKY.IDDK=CTBT.IDDK))
	begin
		RAISERROR('dacosvthi', 16, 1)
		return 1
	end

	update LOPMONHOC 
	set TRANGTHAI=0
	where IDLMH=@idlmh
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_BODE]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_BODE] @idch int
as

if exists(select 1 from CTBT where IDCAUHOI=@idch)
begin
	RAISERROR('FK_CTBT_BODE', 16, 1)
	return 1
end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_DANGKY_HUY]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_CHECK_DANGKY_HUY] @idlmh int
as

if exists(select 1 from LOPMONHOC 
	where IDLMH=@idlmh and IDLMH in (select IDLMH from DANGKY,CTBT where DANGKY.IDDK=CTBT.IDDK))
	begin
		RAISERROR('dacosvthi', 16, 1)
		return 1
	end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_DANGKY_LOPMH_SV]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_CHECK_DANGKY_LOPMH_SV] 
	@nienkhoa nvarchar(10),
	@mamh nchar(15), 
	@hocky smallint,
	@nhom smallint,
	@masv nchar(15)
	
AS
	declare @ID int,
			@ID_DK int
	
	if exists(select 1 from LOPMONHOC where HOCKY=@hocky and NHOM=@nhom and NIENKHOA=@nienkhoa and MAMH=@mamh and TRANGTHAI=1)
	begin
		select @ID=IDLMH from LOPMONHOC where HOCKY=@hocky and NHOM=@nhom and NIENKHOA=@nienkhoa and MAMH=@mamh
		if exists(select 1 from LOPMONHOC where IDLMH=@ID and TRINHDODK='#')
		begin
			raiserror ('chuadkthi',16,1)
			return 5;
		end
		else if exists(select 1 from DANGKY where IDLMH=@ID and MASV=@masv)
		begin
			select @ID_DK=IDDK from DANGKY where IDLMH=@ID and MASV=@masv
			if exists(select 1 from CTBT where IDDK=@ID_DK)
			begin
				raiserror ('dathi',16,1)
				return 2;
			end
			else if exists(select 1 from LOPMONHOC where IDLMH=@ID and CAST(NGAYTHI as date)<>CAST(sysdatetime() as date))
			begin
				raiserror ('kodungngaythi',16,1)
				return 3;
			end
			else
			begin
				select @ID_DK as IDDK
			end
		end
		else
		begin
			raiserror ('chuadklopmh',16,1)
			return 4;
		end
		
	end
	else
	begin
		raiserror ('kotontai',16,1)
		return 1;
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_DANGKY_THITHU]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_DANGKY_THITHU] 
	@td nchar(1), 
	@mamh nchar(15), 
	@sct int,
	@tg int
	
AS
	
	--kiểm tra số câu thi cùng trình độ
	declare @tong_sct int
	select @tong_sct=COUNT(*) from BODE where BODE.MAMH=@mamh and BODE.TRINHDO=@td
	if(@tong_sct<@sct)
	begin
		DECLARE @ErrorMessage NVARCHAR(2000)
		SELECT @ErrorMessage = N'Không đủ số câu thi cùng trình độ! sctkd ' + CAST(@tong_sct as varchar(10))
		RAISERROR(@ErrorMessage, 16, 1)
	end
	else
	begin
		select 1
	end
	
	
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_DANGKY_TRUOC_SUA]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_DANGKY_TRUOC_SUA] @idlmh int
as

--check dang ky da duoc sinh vien thi
if exists(select 1 from DANGKY where IDLMH=@idlmh and IDDK in (select IDDK from CTBT))
	begin
		RAISERROR('svdathi', 16, 1)
		return 1
	end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_GIAOVIEN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_GIAOVIEN] @magv nchar(15)
as

if exists(select 1 from BODE where MAGV=@magv)
begin
	RAISERROR('FK_BODE_GIAOVIEN', 16, 1)
	return 1
end
else if exists(select 1 from LOPMONHOC where MAGV=@magv)
begin
	RAISERROR('FK_LOPMONHOC_GIAOVIEN', 16, 1)
	return 1
end
else if exists(select 1 from LOPMONHOC where MAGVDK=@magv)
begin
	RAISERROR('FK_LOPMONHOC_GIAOVIEN1', 16, 1)
	return 1
end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_KHOA]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_CHECK_KHOA] @makh nchar(15)
as

if exists(select 1 from GIAOVIEN where MAKH=@makh)
begin
	RAISERROR('FK_GIAOVIEN_KHOA', 16, 1)
	return 1
end
else if exists(select 1 from LOPMONHOC where MAKH=@makh)
begin
	RAISERROR('FK_LOPMONHOC_KHOA', 16, 1)
	return 1
end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_LOPMONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_LOPMONHOC] @idlmh int
as

if exists(select 1 from DANGKY where IDLMH=@idlmh)
begin
	RAISERROR('FK_DANGKY_LOPMONHOC', 16, 1)
	return 1
end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_LOPMONHOC_TRUOC_SUA]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_LOPMONHOC_TRUOC_SUA] @idlmh int
as

if exists(select 1 from LOPMONHOC where IDLMH=@idlmh and TRINHDODK<>'#')
	begin
		RAISERROR('daduocdkthi', 16, 1)
		return 1
	end
	else if exists(select 1 from DANGKY where IDLMH=@idlmh)
	begin
		RAISERROR('svdadklopmonhoc', 16, 1)
		return 2
	end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_MONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_MONHOC] @mamh nchar(15)
as

if exists(select 1 from LOPMONHOC where MAMH=@mamh)
begin
	RAISERROR('FK_LOPMONHOC_MONHOC', 16, 1)
	return 1
end
else if exists(select 1 from BODE where MAMH=@mamh)
begin
	RAISERROR('FK_BODE_MONHOC', 16, 1)
	return 1
end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHECK_SINHVIEN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_CHECK_SINHVIEN] @masv nchar(15)
as

if exists(select 1 from DANGKY where MASV=@masv)
begin
	RAISERROR('FK_DANGKY_SINHVIEN', 16, 1)
	return 1
end
else
begin
	select 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_DANGKY_LOPMH_SV]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_DANGKY_LOPMH_SV] 
	@nienkhoa nvarchar(10),
	@mamh nchar(15), 
	@hocky smallint,
	@nhom smallint,
	@masv nchar(15)
	
AS
	declare @ID int
	
	if exists(select 1 from LOPMONHOC where HOCKY=@hocky and NHOM=@nhom and NIENKHOA=@nienkhoa and MAMH=@mamh and TRANGTHAI=1)
	begin
		select @ID=IDLMH from LOPMONHOC where HOCKY=@hocky and NHOM=@nhom and NIENKHOA=@nienkhoa and MAMH=@mamh
		if exists(select 1 from LOPMONHOC 
		where LOPMONHOC.IDLMH=@ID and CAST(NGAYTHI as date)<CAST(sysdatetime() as date))
		begin
			raiserror ('dathi',16,1)
			return 2;
		end
		else
		begin
			insert into DANGKY(IDLMH,MASV,DIEM) values (@ID,@masv,0)
		end
	end
	else
	begin
		raiserror ('kotontai',16,1)
		return 1;
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_DB_BACKUP]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_DB_BACKUP]
	@diengiai nvarchar(128),
	@ghide smallInt
as

	if(@ghide=1)
	begin
		BACKUP DATABASE  TN_TTTN  TO DEV_TN_TTTN WITH INIT, NAME = @diengiai;
	end
	else
	begin
		BACKUP DATABASE  TN_TTTN  TO DEV_TN_TTTN WITH NAME = @diengiai;
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_DB_DS_BACKUP]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_DB_DS_BACKUP]
as
SELECT     position, name, CONVERT(VARCHAR(10),backup_start_date,103)+' '+CONVERT(VARCHAR(10), backup_start_date, 108) backup_start_date , user_nameFROM  msdb.dbo.backupset    WHERE     database_name ='TN_TTTN' AND type='D' AND      backup_set_id >=      		( SELECT MAX(backup_set_id) FROM 	msdb.dbo.backupset          		WHERE media_set_id = 				( SELECT  MAX(media_set_id) 				     FROM msdb.dbo.backupset                             WHERE database_name = 'TN_TTTN' AND type='D')                   AND position=1  AND type='D'           )     ORDER BY position DESC
GO
/****** Object:  StoredProcedure [dbo].[SP_DOIMATKHAU]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_DOIMATKHAU] 
	@email nchar(50),
	@password nvarchar(50),
	@password_new nvarchar(50)
as
	if exists(select 1 from TAIKHOAN where EMAIL=@email and PASSWORD=@password)
	begin
		update TAIKHOAN set PASSWORD=@password_new where EMAIL=@email
	end
	else
	begin
		RAISERROR('mkcusai', 16, 1)
		return 1
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_DOIMATKHAU_GV]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_DOIMATKHAU_GV] 
	@email nchar(50),
	@password nvarchar(50),
	@password_new nvarchar(50)
as
	if exists(select 1 from TAIKHOAN where EMAIL=@email and PASSWORD=@password and MANQ='PGV' or MANQ='GV' or MANQ='admin')
	begin
		update TAIKHOAN set PASSWORD=@password_new where EMAIL=@email
	end
	else
	begin
		RAISERROR('mkcusai', 16, 1)
		return 1
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_DOIMATKHAU_SV]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_DOIMATKHAU_SV] 
	@email nchar(50),
	@password nvarchar(50),
	@password_new nvarchar(50)
as
	if exists(select 1 from TAIKHOAN where EMAIL=@email and PASSWORD=@password and MANQ='SV')
	begin
		update TAIKHOAN set PASSWORD=@password_new where EMAIL=@email
	end
	else
	begin
		RAISERROR('mkcusai', 16, 1)
		return 1
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_CAUHOITHI]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GET_CAUHOITHI]
	@td nchar(1), 
	@mamh nchar(15), 
	@sct int

as
		select TOP(@sct) IDCAUHOI, NOIDUNG, DAP_AN, MALOAICH
		from BODE where TRINHDO=@td and MAMH=@mamh order by NEWID()
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_CAUHOITHI_LICHSU]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GET_CAUHOITHI_LICHSU]
	@idlmh int,
	@masv nchar(15)
	

as
	declare @iddk int
	select @iddk=IDDK from DANGKY where IDLMH=@idlmh and MASV=@masv
	select CTBT.IDCAUHOI, STT, LUACHONSV, NOIDUNG, DAP_AN, MALOAICH 
	from CTBT,BODE
	where CTBT.IDCAUHOI=BODE.IDCAUHOI and IDDK=@iddk
	order by STT
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_CAUHOITHI_LICHSU2]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GET_CAUHOITHI_LICHSU2]
	@idlmh int,
	@masv nchar(15)
	

as
	declare @iddk int
	select @iddk=IDDK from DANGKY where IDLMH=@idlmh and MASV=@masv
	select CTBT.IDCAUHOI, CTBT.STT, LUACHONSV, BODE.NOIDUNG, DAP_AN, MALOAICH, LUACHON.STT, LUACHON.NOIDUNG
	from CTBT
	left join BODE on CTBT.IDCAUHOI=BODE.IDCAUHOI
	left join LUACHON on LUACHON.IDCAUHOI=BODE.IDCAUHOI
	where IDDK=@iddk 
	order by CTBT.STT
	for json auto
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_CAUHOITHI_THU]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_GET_CAUHOITHI_THU]
	@td nchar(1), 
	@mamh nchar(15), 
	@sct int

as
		
declare @tmp table(
	id int
)
		insert into @tmp(id)
		select TOP(@sct) IDCAUHOI
		from BODE where TRINHDO=@td and MAMH=@mamh order by NEWID()

		select BODE.IDCAUHOI, BODE.NOIDUNG, DAP_AN, MALOAICH, STT, LUACHON.NOIDUNG
		from @tmp as v
		left join BODE on BODE.IDCAUHOI=v.id
		left join LUACHON on BODE.IDCAUHOI=LUACHON.IDCAUHOI
		for json auto
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_CAUHOITHI2]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GET_CAUHOITHI2]
	@iddk int

as

SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY

declare @td nchar(1), 
		@mamh nchar(15), 
		@sct int
		
declare @tmp table(
	id int,
	stt_cauhoi int IDENTITY(1,1) PRIMARY KEY
)
		select @td=TRINHDODK, @mamh=MAMH, @sct=SCT from LOPMONHOC where IDLMH=(select IDLMH from DANGKY where IDDK=@iddk)

		if exists(select 1 from TEMP_CTBT where IDDK=@iddk)
		begin
			if exists(select 1 from DANGKY where THOIGIANCONLAI_S is not NULL and THOIGIANCONLAI_S > 0)
			begin
				insert into @tmp(id)
				select IDCAUHOI
				from TEMP_CTBT where IDDK=@iddk order by STT
			end
			else
			begin
				RAISERROR('Lỗi ', 16, 1)
				return 1;
			end
		end
		else
		begin
			insert into @tmp(id)
			select TOP(@sct) IDCAUHOI
			from BODE where TRINHDO=@td and MAMH=@mamh order by NEWID()

			insert into TEMP_CTBT(IDDK, IDCAUHOI, STT, LUACHONSV)
			select @iddk, id, stt_cauhoi, '' from @tmp 

			declare @tg int
			select @tg=THOIGIANTHI from LOPMONHOC where IDLMH=(select IDLMH from DANGKY where IDDK=@iddk)

			update DANGKY set THOIGIANCONLAI_S = @tg * 60 where IDDK=@iddk
		end

		select BODE.IDCAUHOI, BODE.NOIDUNG, DAP_AN, MALOAICH, STT, LUACHON.NOIDUNG
		from @tmp as v
		left join BODE on BODE.IDCAUHOI=v.id
		left join LUACHON on BODE.IDCAUHOI=LUACHON.IDCAUHOI
		for json auto

		--ds lựa chọn sv
		select LUACHONSV from TEMP_CTBT where IDDK=@iddk order by STT
		
		COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_LICHSUTHI]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GET_LICHSUTHI]
	@masv nchar(15)

as

	select LOPMONHOC.IDLMH, NIENKHOA, HOCKY, NHOM, NGAYTHI, DIEM, TENMH  
	from LOPMONHOC, DANGKY, MONHOC where LOPMONHOC.IDLMH=DANGKY.IDLMH and LOPMONHOC.MAMH=MONHOC.MAMH
		and MASV=@masv and IDDK in (select distinct IDDK from CTBT) order by NGAYTHI desc

		
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_LMH_FILTER]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GET_LMH_FILTER]
	@nienkhoa nvarchar(10),
	@hocky smallint
as


	if(@nienkhoa is not null and @nienkhoa<>'0' and @hocky is not null and @hocky<>0)
	begin
		select IDLMH, NIENKHOA, HOCKY, NHOM, SOSVTT, TENKH, TENMH, GIAOVIEN.MAGV, HO, TEN 
		from LOPMONHOC, KHOA, MONHOC, GIAOVIEN 
		where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH and 
		LOPMONHOC.MAGV=GIAOVIEN.MAGV and TRANGTHAI=1 and NIENKHOA=@nienkhoa and HOCKY=@hocky
	end
	else if(@nienkhoa is not null and @nienkhoa<>'0')
	begin
		select IDLMH, NIENKHOA, HOCKY, NHOM, SOSVTT, TENKH, TENMH, GIAOVIEN.MAGV, HO, TEN 
		from LOPMONHOC, KHOA, MONHOC, GIAOVIEN 
		where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH and 
		LOPMONHOC.MAGV=GIAOVIEN.MAGV and TRANGTHAI=1 and NIENKHOA=@nienkhoa
	end
	else if(@hocky is not null and @hocky<>0)
	begin
		select IDLMH, NIENKHOA, HOCKY, NHOM, SOSVTT, TENKH, TENMH, GIAOVIEN.MAGV, HO, TEN 
		from LOPMONHOC, KHOA, MONHOC, GIAOVIEN 
		where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH and 
		LOPMONHOC.MAGV=GIAOVIEN.MAGV and TRANGTHAI=1 and HOCKY=@hocky
	end
	else
	begin
		select IDLMH, NIENKHOA, HOCKY, NHOM, SOSVTT, TENKH, TENMH, GIAOVIEN.MAGV, HO, TEN 
		from LOPMONHOC, KHOA, MONHOC, GIAOVIEN 
		where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH and 
		LOPMONHOC.MAGV=GIAOVIEN.MAGV and TRANGTHAI=1
	end

GO
/****** Object:  StoredProcedure [dbo].[SP_GHI_DIEM_CTBT]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GHI_DIEM_CTBT]
	@ctbt CTBTType readonly,
	@iddk int,
	@diem float
as
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY

	update DANGKY set DIEM=@diem where IDDK=@iddk

	insert into CTBT(IDDK,IDCAUHOI,STT,LUACHONSV)
	select @iddk, IDCAUHOI, STT, LUACHONSV from @ctbt

	DELETE FROM TEMP_CTBT WHERE IDDK=@iddk;

	update DANGKY set THOIGIANCONLAI_S=0 where IDDK=@iddk


	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_HUY_DANGKY]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_HUY_DANGKY] 
	@id int
	
AS
	if exists(select 1 from LOPMONHOC 
	where IDLMH=@id and IDLMH in (select IDLMH from DANGKY,CTBT where DANGKY.IDDK=CTBT.IDDK))
	begin
		RAISERROR('dacosvthi', 16, 1)
		return 1
	end

	--huy dang ky
	update LOPMONHOC set MAGVDK=NULL, TRINHDODK='#', NGAYTHI=NULL, SCT=NULL, THOIGIANTHI=NULL where IDLMH=@id
GO
/****** Object:  StoredProcedure [dbo].[SP_LOGIN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_LOGIN]
	@email nchar(50),
	@password nvarchar(50)
as
	declare @manq nchar(15)

	if exists(select 1 from TAIKHOAN where EMAIL=@email and PASSWORD=@password COLLATE Latin1_General_CS_AS )
	begin
		select @manq= MANQ from TAIKHOAN where EMAIL=@email and PASSWORD=@password
		if(@manq='SV')
		begin
			select MASV, EMAIL, @manq as MANQ from SINHVIEN where EMAIL=@email
		end
		else if(@manq='admin')
		begin
			select EMAIL, @manq as MANQ from TAIKHOAN where EMAIL=@email
		end
		else 
		begin
			select MAGV, EMAIL, @manq as MANQ from GIAOVIEN where EMAIL=@email
		end
	end
	else
	begin
		RAISERROR('Lỗi', 16, 1)
		return 1
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_REPORT_BANGDIEM]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_REPORT_BANGDIEM] @idlmh int
as

select SINHVIEN.MASV, HO, TEN, CONVERT(VARCHAR(10),NGAYSINH,103) as NGAYSINH, DIACHI, EMAIL, ROUND(DIEM * 2, 0) / 2 as DIEM, dbo.Num2Text(ROUND(DIEM * 2, 0) / 2) AS DIEMCHU
from DANGKY, SINHVIEN where IDLMH=@idlmh and DANGKY.MASV=SINHVIEN.MASV

select NIENKHOA, HOCKY, NHOM, LOPMONHOC.MAMH, TENMH, CONVERT(VARCHAR(10),NGAYTHI,103) as NGAYTHI, THOIGIANTHI, TENKH, TRINHDODK, HO+' '+TEN as HOTENGV
from LOPMONHOC
join MONHOC on LOPMONHOC.MAMH=MONHOC.MAMH
join KHOA on LOPMONHOC.MAKH=KHOA.MAKH
join GIAOVIEN on LOPMONHOC.MAGV=GIAOVIEN.MAGV
where IDLMH=@idlmh
GO
/****** Object:  StoredProcedure [dbo].[SP_REPORT_CTBT]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[SP_REPORT_CTBT] @idlmh int, @masv nchar(15)
as

SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY

select IDLMH, NIENKHOA, HOCKY, NHOM, TENKH, TENMH, GIAOVIEN.MAGV, CONCAT(HO, ' ', TEN) as HOTENGV, CONVERT(VARCHAR(10),NGAYTHI,103) as NGAYTHI
from LOPMONHOC, KHOA, MONHOC, GIAOVIEN 
where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH
and LOPMONHOC.MAGV=GIAOVIEN.MAGV and TRANGTHAI=1 and IDLMH=@idlmh

select SINHVIEN.MASV, CONCAT(HO, ' ', TEN) as HOTENSV, CONVERT(VARCHAR(10),NGAYSINH,103) as NGAYSINH, DIACHI, EMAIL, ROUND(DIEM * 2, 0) / 2 as DIEM, dbo.Num2Text(ROUND(DIEM * 2, 0) / 2) AS DIEMCHU
from DANGKY, SINHVIEN where IDLMH=@idlmh and DANGKY.MASV=SINHVIEN.MASV and SINHVIEN.MASV=@masv

------------------------------------------------------------------------------------------------------------
DECLARE @NewLineChar AS CHAR(2) = CHAR(13) + CHAR(10)

declare @TEMP_CAUHOI table(
	IDCAUHOI int, 
	STT int, 
	LUACHONSV nvarchar(30),
	NOIDUNG nvarchar(MAX),
	DAP_AN nvarchar(30),
	CACLUACHON nvarchar(MAX)
)

Declare DS_CAUHOI scroll cursor for
select CTBT.IDCAUHOI, STT, LUACHONSV, NOIDUNG, DAP_AN, MALOAICH
from CTBT
join BODE on BODE.IDCAUHOI=CTBT.IDCAUHOI
where IDDK = (select IDDK from DANGKY where MASV=@masv and IDLMH=@idlmh)
order by STT

OPEN DS_CAUHOI

declare @idch int, @stt int, @luachonsv nvarchar(30), @noidung nvarchar(MAX), @dapan nvarchar(30), @malch nvarchar(15)

FETCH FIRST FROM DS_CAUHOI INTO @idch, @stt, @luachonsv, @noidung, @dapan, @malch

WHILE (@@FETCH_STATUS <> -1)
  BEGIN
    declare @tmp nvarchar(MAX)
	set @tmp = ''

	if @malch = 'NLC'
	begin
		declare DS_LUACHON scroll cursor for
		select STT, NOIDUNG from LUACHON where IDCAUHOI=@idch order by STT

		OPEN DS_LUACHON

		declare @stt_lc nchar(1), @noidung_lc nvarchar(200)
		FETCH FIRST FROM DS_LUACHON INTO @stt_lc, @noidung_lc
		WHILE (@@FETCH_STATUS <> -1)
		 BEGIN
			set @tmp = @tmp + @stt_lc + ': ' + @noidung_lc + @NewLineChar

			FETCH NEXT FROM DS_LUACHON INTO @stt_lc, @noidung_lc
		 END

		CLOSE DS_LUACHON
		DEALLOCATE DS_LUACHON
	end

	insert into @TEMP_CAUHOI(IDCAUHOI, STT, LUACHONSV, NOIDUNG, DAP_AN, CACLUACHON)
	values(@idch, @stt, @luachonsv, @noidung, @dapan, @tmp)

    FETCH NEXT FROM DS_CAUHOI INTO @idch, @stt, @luachonsv, @noidung, @dapan, @malch
  END
THOAT:
  CLOSE DS_CAUHOI
  DEALLOCATE DS_CAUHOI

  select * from @TEMP_CAUHOI


    COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_REPORT_DSKYTEN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_REPORT_DSKYTEN] @idlmh int
as

select SINHVIEN.MASV, HO, TEN, CONVERT(VARCHAR(10),NGAYSINH,103) as NGAYSINH, DIACHI, EMAIL
from DANGKY, SINHVIEN where IDLMH=@idlmh and DANGKY.MASV=SINHVIEN.MASV

select NIENKHOA, HOCKY, NHOM, LOPMONHOC.MAMH, TENMH, CONVERT(VARCHAR(10),NGAYTHI,103) as NGAYTHI, THOIGIANTHI, TENKH, TRINHDODK, HO+' '+TEN as HOTENGV
from LOPMONHOC
join MONHOC on LOPMONHOC.MAMH=MONHOC.MAMH
join KHOA on LOPMONHOC.MAKH=KHOA.MAKH
join GIAOVIEN on LOPMONHOC.MAGV=GIAOVIEN.MAGV
where IDLMH=@idlmh
GO
/****** Object:  StoredProcedure [dbo].[SP_REPORT_LOPMONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_REPORT_LOPMONHOC] @trangthai smallint
as

select IDLMH, NIENKHOA, HOCKY, NHOM, SOSVTT, TENKH, TENMH, GIAOVIEN.MAGV, CONCAT(HO, ' ', TEN) as HOTENGV
from LOPMONHOC, KHOA, MONHOC, GIAOVIEN 
where LOPMONHOC.MAKH=KHOA.MAKH and LOPMONHOC.MAMH=MONHOC.MAMH and LOPMONHOC.MAGV=GIAOVIEN.MAGV and TRANGTHAI=@trangthai
GO
/****** Object:  StoredProcedure [dbo].[SP_SUA_BODE]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_SUA_BODE] 
	@td nchar(1), 
	@noidung nvarchar(MAX), 
	@dap_an nvarchar(30), 
	@mamh nchar(15), 
	@idch int,
	@cacluachonJson nvarchar(1000)
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
	declare @malch nchar(15)
	select @malch=MALOAICH from BODE where IDCAUHOI=@idch

	update BODE set TRINHDO=@td, NOIDUNG=@noidung, DAP_AN=@dap_an, MAMH=@mamh where IDCAUHOI=@idch 

	IF @malch='NLC'
	BEGIN
		delete from LUACHON where IDCAUHOI=@idch

		insert into LUACHON(STT, NOIDUNG, IDCAUHOI)
		select STT, NOIDUNG, @idch
		from OPENJSON(@cacluachonJson) with (STT nchar(1) 'strict $.STT', NOIDUNG nvarchar(200) '$.NOIDUNG')
	END
	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_SUA_DANGKY_CHECK_SCT]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_SUA_DANGKY_CHECK_SCT] 
	@td nchar(1), 
	@ngaythi datetime,
	@sct int,
	@tg int,
	@id int
	
AS
	--check dang ky da duoc sinh vien thi
	if exists(select 1 from DANGKY where IDLMH=@id and IDDK in (select IDDK from CTBT))
	begin
		RAISERROR('svdathi', 16, 1)
		return 1
	end

	declare @mamh nchar(15),
			@ngaythi_cu datetime

	select @mamh=MAMH, @ngaythi_cu=NGAYTHI from LOPMONHOC where IDLMH=@id
	--kiểm tra số câu thi cùng trình độ
	declare @tong_sct int
	select @tong_sct=COUNT(*) from BODE where BODE.MAMH=@mamh and BODE.TRINHDO=@td

	if(@tong_sct<@sct)
	begin
		DECLARE @ErrorMessage NVARCHAR(2000)
		SELECT @ErrorMessage = N'Không đủ số câu thi cùng trình độ! sctkd ' + CAST(@tong_sct as varchar(10))
		RAISERROR(@ErrorMessage, 16, 1)
		return 2
	end
	else
	begin
		if(CAST(@ngaythi as date)=CAST(@ngaythi_cu as date))
		begin
			update LOPMONHOC set SCT=@sct, THOIGIANTHI=@tg, TRINHDODK=@td 
					where IDLMH=@id	
		end
		else
		begin
			if(CAST(@ngaythi as date)<CAST(sysdatetime() as date))
			begin
				RAISERROR('ngaythiquakhu', 16, 1)
				return 3
			end
			else
			begin
				update LOPMONHOC set SCT=@sct, THOIGIANTHI=@tg, TRINHDODK=@td, NGAYTHI=@ngaythi
					where IDLMH=@id	and TRANGTHAI=1
			end
		end
	end
GO
/****** Object:  StoredProcedure [dbo].[SP_SUA_LOPMONHOC]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_SUA_LOPMONHOC] 
	@nienkhoa nvarchar(10),
	@mamh nchar(15), 
	@makh nchar(15), 
	@magv nchar(15), 
	@hocky smallint,
	@nhom smallint,
	@sosvtt int,
	@id int
	
AS

	if exists(select 1 from LOPMONHOC where IDLMH=@id and TRINHDODK<>'#')
	begin
		RAISERROR('daduocdkthi', 16, 1)
		return 1
	end
	else if exists(select 1 from DANGKY where IDLMH=@id)
	begin
		RAISERROR('svdadklopmonhoc', 16, 1)
		return 2
	end

	update LOPMONHOC 
	set NIENKHOA=@nienkhoa, HOCKY=@hocky, NHOM=@nhom, SOSVTT=@sosvtt, MAKH=@makh, MAMH=@mamh, MAGV=@magv 
	where IDLMH=@id
GO
/****** Object:  StoredProcedure [dbo].[SP_THEM_BODE]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_THEM_BODE] 
	@td nchar(1), 
	@noidung nvarchar(MAX), 
	@dap_an nvarchar(30), 
	@mamh nchar(15), 
	@malch nchar(15),
	@magv nchar(15), 
	@a nvarchar(200), 
	@b nvarchar(200), 
	@c nvarchar(200), 
	@d nvarchar(200)
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY

	insert into BODE(TRINHDO, NOIDUNG, DAP_AN, MAMH, MALOAICH, MAGV) 
		values (@td, @noidung, @dap_an, @mamh, @malch, @magv)

	IF @malch='NLC' and @a<>'' and @b<>'' --them cac lua chon vao table LUACHON
	BEGIN
		insert into LUACHON(STT, NOIDUNG, IDCAUHOI) 
		values ('A', @a, IDENT_CURRENT('BODE'))
		insert into LUACHON(STT, NOIDUNG, IDCAUHOI) 
		values ('B', @b, IDENT_CURRENT('BODE'))
		IF @c<>''
		BEGIN
			insert into LUACHON(STT, NOIDUNG, IDCAUHOI) 
			values ('C', @c, IDENT_CURRENT('BODE'))
		END
		IF @d<>''
		BEGIN
			insert into LUACHON(STT, NOIDUNG, IDCAUHOI) 
			values ('D', @d, IDENT_CURRENT('BODE'))
		END
	END
	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_THEM_BODE_EXCEL]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_THEM_BODE_EXCEL] 
		@caccauhoi CauHoiType readonly,
		@cacluachon LuaChonType readonly,
		@mamh nchar(15),
		@magv nchar(15)
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
  DECLARE @CrsrVar CURSOR,
          @idx int,
          @td nchar(1),
		  @noidung nvarchar(max),
		  @dap_an nvarchar(30),
		  @malch nchar(15)

  EXEC CursorBoDeExcel @CrsrVar OUTPUT, @caccauhoi

  FETCH NEXT FROM @CrsrVar INTO @idx, @td, @noidung, @dap_an, @malch

  WHILE (@@FETCH_STATUS <> -1)
  BEGIN
    if not exists(select 1 from BODE where NOIDUNG=@noidung)
	begin
		insert into BODE(TRINHDO, NOIDUNG, DAP_AN, MAMH, MALOAICH, MAGV)
		values (@td, @noidung, @dap_an, @mamh, @malch, @magv)

		if(@malch='NLC')
		begin
			insert into LUACHON(STT, NOIDUNG, IDCAUHOI)
			select STT, NOIDUNG, IDENT_CURRENT('BODE') from @cacluachon where IDX = @idx
		end
	end
    
    FETCH NEXT FROM @CrsrVar INTO @idx, @td, @noidung, @dap_an, @malch
  END
THOAT:
  CLOSE @CrsrVar
  DEALLOCATE @CrsrVar

  COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_THEM_BODE2]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_THEM_BODE2] 
	@td nchar(1), 
	@noidung nvarchar(MAX), 
	@dap_an nvarchar(30), 
	@mamh nchar(15), 
	@malch nchar(15),
	@magv nchar(15)
	--@cacluachon LuaChonType readonly
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY

	insert into BODE(TRINHDO, NOIDUNG, DAP_AN, MAMH, MALOAICH, MAGV) 
		values (@td, @noidung, @dap_an, @mamh, @malch, @magv)

	--IF @malch='NLC' --them cac lua chon vao table LUACHON
	--BEGIN
		--insert into LUACHON(STT, NOIDUNG, IDCAUHOI)
		--select STT, NOIDUNG, IDENT_CURRENT('BODE') from @cacluachon
	--END
	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_THEM_BODE3]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_THEM_BODE3] 
	@td nchar(1), 
	@noidung nvarchar(MAX), 
	@dap_an nvarchar(30), 
	@mamh nchar(15), 
	@malch nchar(15),
	@magv nchar(15),
	@cacluachonJson nvarchar(1000)
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY

	insert into BODE(TRINHDO, NOIDUNG, DAP_AN, MAMH, MALOAICH, MAGV) 
		values (@td, @noidung, @dap_an, @mamh, @malch, @magv)

	IF @malch='NLC' --them cac lua chon vao table LUACHON
	BEGIN
		insert into LUACHON(STT, NOIDUNG, IDCAUHOI)
		select STT, NOIDUNG, IDENT_CURRENT('BODE') 
		from OPENJSON(@cacluachonJson) with (STT nchar(1) 'strict $.STT', NOIDUNG nvarchar(200) '$.NOIDUNG')
	END
	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_THEM_DANGKY_CHECK_SCT]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_THEM_DANGKY_CHECK_SCT] 
	@td nchar(1), 
	@nienkhoa nvarchar(10),
	@mamh nchar(15), 
	@magvdk nchar(15), 
	@ngaythi datetime,
	@hocky smallint,
	@nhom smallint,
	@sct int,
	@tg int
	
AS
	
	--kiểm tra số câu thi cùng trình độ
	declare @tong_sct int
	select @tong_sct=COUNT(*) from BODE where BODE.MAMH=@mamh and BODE.TRINHDO=@td
	if(@tong_sct<@sct)
	begin
		DECLARE @ErrorMessage NVARCHAR(2000)
		SELECT @ErrorMessage = N'Không đủ số câu thi cùng trình độ! sctkd ' + CAST(@tong_sct as varchar(10))
		RAISERROR(@ErrorMessage, 16, 1)
	end
	else
	begin
		update LOPMONHOC set MAGVDK=@magvdk, NGAYTHI=@ngaythi, SCT=@sct, THOIGIANTHI=@tg, TRINHDODK=@td 
			where NIENKHOA=@nienkhoa and HOCKY=@hocky and NHOM=@nhom and MAMH=@mamh and TRINHDODK='#' and TRANGTHAI=1
	end
	
	
GO
/****** Object:  StoredProcedure [dbo].[SP_THEM_EXCEL]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_THEM_EXCEL] 
		@caccauhoi CauHoiType readonly,
		@cacluachon LuaChonType readonly,
		@tenmh nvarchar(50),
		@email nchar(50)
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
  DECLARE @CrsrVar CURSOR,
          @idx int,
          @td nchar(1),
		  @noidung nvarchar(max),
		  @dap_an nvarchar(30),
		  @mamh nchar(15),
		  @malch nchar(15),
		  @magv nchar(15)


  EXEC CursorBoDeExcel @CrsrVar OUTPUT, @caccauhoi

  if not exists(select 1 from MONHOC where TENMH=@tenmh)
  begin
	RAISERROR('mhktt', 16, 1)
	return 1
  end

  select @mamh=MAMH from MONHOC where TENMH=@tenmh
  select @magv=MAGV from GIAOVIEN where EMAIL=@email


  FETCH NEXT FROM @CrsrVar INTO @idx, @td, @noidung, @dap_an, @malch

  WHILE (@@FETCH_STATUS <> -1)
  BEGIN
    insert into BODE(TRINHDO, NOIDUNG, DAP_AN, MAMH, MALOAICH, MAGV)
	values (@td, @noidung, @dap_an, @mamh, @malch, @magv)

	if(@malch='NLC')
	begin
		insert into LUACHON(STT, NOIDUNG, IDCAUHOI)
		select STT, NOIDUNG, IDENT_CURRENT('BODE') from @cacluachon where IDX = @idx
	end
    
    FETCH NEXT FROM @CrsrVar INTO @idx, @td, @noidung, @dap_an, @malch
  END
THOAT:
  CLOSE @CrsrVar
  DEALLOCATE @CrsrVar

  COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_THEMGV_TAIKHOANMD]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_THEMGV_TAIKHOANMD] 
	@magv nchar(15), 
	@ho nvarchar(50), 
	@ten nvarchar(15), 
	@diachi nvarchar(200), 
	@sdt nchar(12), 
	@email nchar(50), 
	@makh nchar(15),
	@manq nchar(15)
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
	--Thêm tài khoản mặc định cho giáo viên
	insert into TAIKHOAN(EMAIL, PASSWORD, MANQ) values (@email, '123', @manq)

	insert into GIAOVIEN(MAGV, HO, TEN, DIACHI, SDT, EMAIL, MAKH) 
	values (@magv, @ho, @ten, @diachi, @sdt, @email, @makh)

	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_THEMSV_TAIKHOANMD]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_THEMSV_TAIKHOANMD] 
	@masv nchar(15), 
	@ho nvarchar(50), 
	@ten nvarchar(15), 
	@ngaysinh datetime, 
	@diachi nvarchar(200), 
	@email nchar(50)
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
	--Thêm tài khoản mặc định cho giáo viên
	insert into TAIKHOAN(EMAIL, PASSWORD, MANQ) values (@email, '123', 'SV')

	insert into SINHVIEN(MASV, HO, TEN, NGAYSINH, DIACHI, EMAIL) 
	values (@masv, @ho, @ten, @ngaysinh, @diachi, @email)

	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_XOA_BODE]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_XOA_BODE] 
	@idch int
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
	declare @malch nchar(15)
	select @malch=MALOAICH from BODE where IDCAUHOI=@idch

	if exists(select 1 from CTBT where IDCAUHOI=@idch)
	begin
		RAISERROR('FK_CTBT_BODE', 16, 1)
		return 1
	end

	if(@malch='NLC')
	begin
		delete from LUACHON where IDCAUHOI=@idch
	end

	delete from BODE where IDCAUHOI=@idch

	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_XOAGV_TAIKHOAN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_XOAGV_TAIKHOAN] 
	@magv nchar(15)
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
	if exists(select 1 from BODE where MAGV=@magv)
	begin
		RAISERROR('FK_BODE_GIAOVIEN', 16, 1)
		return 1
	end
	if exists(select 1 from LOPMONHOC where MAGV=@magv)
	begin
		RAISERROR('FK_LOPMONHOC_GIAOVIEN', 16, 1)
		return 2
	end
	if exists(select 1 from LOPMONHOC where MAGVDK=@magv)
	begin
		RAISERROR('FK_LOPMONHOC_GIAOVIEN1', 16, 1)
		return 3
	end
	declare @email nchar(50)
	select @email=EMAIL from GIAOVIEN where MAGV=@magv
	delete from GIAOVIEN where MAGV=@magv
	delete from TAIKHOAN where EMAIL=@email
	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
/****** Object:  StoredProcedure [dbo].[SP_XOASV_TAIKHOAN]    Script Date: 14/12/2021 7:42:15 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_XOASV_TAIKHOAN] 
	@masv nchar(15)
	
AS
SET XACT_ABORT ON
BEGIN TRAN
BEGIN TRY
	if exists(select 1 from DANGKY where MASV=@masv)
	begin
		RAISERROR('FK_DANGKY_SINHVIEN', 16, 1)
		return 1
	end
	declare @email nchar(50)
	select @email=EMAIL from SINHVIEN where MASV=@masv
	delete from SINHVIEN where MASV=@masv
	delete from TAIKHOAN where EMAIL=@email
	
	COMMIT
END TRY
BEGIN CATCH
   ROLLBACK
   DECLARE @ErrorMessage VARCHAR(2000)
   SELECT @ErrorMessage = 'Lỗi: ' + ERROR_MESSAGE()
   RAISERROR(@ErrorMessage, 16, 1)
END CATCH
GO
