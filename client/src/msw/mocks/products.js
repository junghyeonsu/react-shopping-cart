import { rest } from 'msw'

const handlers = [
  rest.get('/products', (req, res, ctx) => {
    const pageOffset = req.url.searchParams.get('_offset')
    const limit = req.url.searchParams.get('_limit')
    const pageSize = Math.ceil(mockProducts.length / limit)

    const startIndex = pageOffset * limit - limit
    const endIndex = pageOffset * limit

    const products = mockProducts.slice(startIndex, endIndex)
    return res(
      ctx.json({
        pageSize,
        products,
      })
    )
  }),
]

export default handlers

export const mockProducts = [
  {
    id: 1,
    name: '냉면용기(대)',
    price: 83700,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  },
  {
    id: 2,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
  {
    id: 3,
    name: '펩시 콜라 355ml 24캔',
    price: 83700,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/84fc0238-0239-4d0e-870b-a9daa6f2c42c.jpg',
  },
  {
    id: 4,
    name: '리치스 스위트콘 대 2.95kg',
    price: 4780,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/ff297e50-7d6b-4a87-8509-b387442ff877.jpg',
  },
  {
    id: 5,
    name: '하늘푸드 스위트고로케 1kg',
    price: 5200,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  },
  {
    id: 6,
    name: '야채고로케 (60g*18입) 1080g',
    price: 11170,
    imageUrl: 'https://cdn-mart.baemin.com/goods/custom/20200427/9751-main-01.png',
  },
  {
    id: 7,
    name: '식자재왕 김말이튀김 야채맛 1kg',
    price: 6580,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211210-155432/9416-main-01.jpg',
  },
  {
    id: 8,
    name: '삼양 야채튀김 (60g*50±1/박스) 3kg',
    price: 24610,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/8916edff-9fa9-4538-95c3-13d463f58a86.jpg',
  },
  {
    id: 9,
    name: '미미사 분모자 (17mm) 250G',
    price: 1440,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6ae4c431-6988-41ab-8894-7df7ee7b7cb3.jpg',
  },
  {
    id: 10,
    name: '손수 맛있는 쌀떡볶이떡 1kg',
    price: 2200,
    imageUrl: 'https://cdn-mart.baemin.com/goods/21/10221-main-01.jpg',
  },
  {
    id: 11,
    name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
    price: 21800,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
  },
  {
    id: 12,
    name: '[리뉴얼]젓가락(종이)-정성을 담아',
    price: 21800,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
  },
  {
    id: 13,
    name: '냉면용기(소/FP) 50개',
    price: 10350,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/eb708d4f-3334-4c54-97ab-5de58df5df55.jpg',
  },
  {
    id: 14,
    name: '밀키스마 멸균우유3.5% 1L 팩 12개',
    price: 19290,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/b4edc575-fa5b-472e-a733-fda7d8a65fcf.jpg',
  },
  {
    id: 15,
    name: '썬리취 모짜렐라골든치즈 자연100% PA 2.5kg',
    price: 21720,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/f6387fcb-e38e-4def-9e33-236aab729b0d.png',
  },
  {
    id: 16,
    name: '노르웨이 냉동 연어필렛 trim E 1.5~1.7kg',
    price: 21720,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/04fe4521-aa09-4a53-8b8b-4abfdea46338.jpg',
  },
  {
    id: 17,
    name: '페루산 냉동 딸기 1kg',
    price: 5200,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/eb8ea1ed-7988-4b31-a352-8d27773812de.jpg',
  },
  {
    id: 18,
    name: '국내산 피양파 1망(15kg내외)',
    price: 11900,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/fc15dd1f-b30e-4bed-b046-60338930fc1d.png',
  },
  {
    id: 19,
    name: '반찬용기(GP-2002)',
    price: 40200,
    imageUrl:
      'https://cdn-mart.baemin.com/goods/78/D9-RM-97389_%EC%86%8C%EB%9F%89_%EB%B0%98%EC%B0%AC%EC%9A%A9%EA%B8%B0(CN_GP-2002).jpg',
  },
  {
    id: 20,
    name: '냉동 멘보샤 600g 3개',
    price: 37500,
    imageUrl:
      'https://cdn-mart.baemin.com/goods/79/%EB%83%89%EB%8F%99-%EB%A9%98%EB%B3%B4%EC%83%A4-600g-3%EA%B0%9C_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg',
  },
  {
    id: 21,
    name: '소스컵-70파이(대/AJ/흑색)',
    price: 66000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/f192f3c7-c993-45fc-b6bf-7ac595a7d224.jpg',
  },
  {
    id: 22,
    name: '칵테일새우 (71/90) 500g 4개',
    price: 35000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/bc07ab97-897b-4140-832f-221af0f36537.jpg',
  },
  {
    id: 23,
    name: '치킨브레스트햄 슬라이스 300g',
    price: 3920,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211125-103728/12586-main-01.jpg',
  },
  {
    id: 24,
    name: '옥구농협 못잊어 신동진(신동진/보통/20년)20KG',
    price: 52800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220203-195555/23358-main-01.jpg',
  },
  {
    id: 25,
    name: '전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
    price: 3940,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/73f990e7-bd21-4666-b25e-7a00353710f2.jpg',
  },
  {
    id: 26,
    name: '생새우살 (91/120) 10kg',
    price: 129000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/4de5dddd-9067-4b06-a530-d5824fa4437a.jpg',
  },
  {
    id: 27,
    name: '맘스터치앤컴퍼니(해마로) 순살치킨 1kg 5개',
    price: 44800,
    imageUrl: 'https://cdn-mart.baemin.com/goods/36/1556013318466m0.jpg',
  },
  {
    id: 28,
    name: '치킨브레스트햄 슬라이스 300g',
    price: 3920,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211125-103728/12586-main-01.jpg',
  },
  {
    id: 29,
    name: '중화 미원 2kg',
    price: 16380,
    imageUrl: 'https://cdn-mart.baemin.com/goods/custom/20200608/11659-main-01.jpg',
  },
  {
    id: 30,
    name: '전처리 양파 슬라이스 6mm(국내산/링형) 1KG',
    price: 3940,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/7a174124-4b3c-4a3b-8c54-585554f3076b.jpg',
  },
  {
    id: 31,
    name: '중국산 냉동 청피망다이스 1kg',
    price: 2340,
    imageUrl: 'https://cdn-mart.baemin.com/goods/custom/20200714-MARTENG-8721/13793-main-01.jpg',
  },
  {
    id: 32,
    name: '종이용기(1370cc)-제 그릇이 좀 큰 편이죠',
    price: 6630,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/ab5c82ee-f86b-44f9-8933-51d61e603998.jpg',
  },
  {
    id: 33,
    name: '국내산 청피망 1kg 내외',
    price: 8000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/84e6fba5-79bf-4cbd-82d7-42b90ddd6951.jpg',
  },
  {
    id: 34,
    name: '불고기프리미엄S 700g',
    price: 15820,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220223-132151/12632-main-01.jpg',
  },
  {
    id: 35,
    name: '냉동 다진마늘 (중국산) 1kg',
    price: 2500,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/5604d4fa-b240-45be-9658-388df95ee4cc.jpg',
  },
  {
    id: 36,
    name: '다이아몬드 멘보샤 500g',
    price: 9580,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/498b7ae5-9b74-4016-9475-a42272373af0.jpg',
  },
]
