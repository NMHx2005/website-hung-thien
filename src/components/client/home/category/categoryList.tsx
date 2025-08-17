import "./category.scss"


interface Category {
    image: string;
    name: string;
}



const CategoryList = () => {
    const categories: Category[] = [
        { image: 'https://storage.googleapis.com/a1aa/image/uqZdCuG_rpc6G_OAkIkVQ-qolCCU72wqFSJkUBR-8Kk.jpg', name: 'Khách sạn - Du lịch' },
        { image: 'https://storage.googleapis.com/a1aa/image/0xEZLTBDmSPV188dmYUhTXyO00HAaAgucheFpwRkEog.jpg', name: 'Giáo dục' },
        { image: 'https://storage.googleapis.com/a1aa/image/S7qFjjnu0XmcvUUpQV9Od3frSAy18SyvlA0mg39E4i8.jpg', name: 'Mẹ và bé' },
        { image: 'https://storage.googleapis.com/a1aa/image/qoQ8GvX7qdnNr--g3sYgW235meeLhFJBtVhhbcTYmWg.jpg', name: 'Mỹ phẩm - Làm đẹp' },
        { image: 'https://storage.googleapis.com/a1aa/image/p2HBUTZDERvmau4jeCu7K6gI7RveaPPfO4olv2vKjfY.jpg', name: 'Thời trang - Trang sức' },
        { image: 'https://storage.googleapis.com/a1aa/image/J9y4vJpIItZ0VxJaNUVMFhgDW3r0wuWj6a6iTFm0s-w.jpg', name: 'Thực phẩm - Nhà hàng' },
        { image: 'https://storage.googleapis.com/a1aa/image/1Homfo0t2FjSeybzx4EkYfLnHZaTWQUA79GPWq1024Y.jpg', name: 'Đồ gia dụng - Sinh hoạt' },
        { image: 'https://storage.googleapis.com/a1aa/image/qVCdgccm-pjGdTPlTwuWZajDGPPT02eEsSa2WidS9SE.jpg', name: 'Nội thất - Trang trí' },
        { image: 'https://storage.googleapis.com/a1aa/image/py9boWkGGyOQlywGNMEmkgvZ_RLFLyJyatez2HxSqWQ.jpg', name: 'Sách - Văn phòng phẩm' },
        { image: 'https://storage.googleapis.com/a1aa/image/hEGXXeV5rTgaEgMNgKIOyRWGCfGYvrQjWOKupUNOHbo.jpg', name: 'Công nghệ - Kỹ thuật số' },
        { image: 'https://storage.googleapis.com/a1aa/image/loFXydO6tRnmxk4A55mMyOfTZZaiYYHnVfe0cJROBko.jpg', name: 'Phương tiện giao thông' },
        { image: 'https://storage.googleapis.com/a1aa/image/Nx4E9Sb8723nW6KrNIh1u92nUVA0z-O6I9uO3PZb7oQ.jpg', name: 'Thể thao - Dịch vụ' },
        { image: 'https://storage.googleapis.com/a1aa/image/vLVinIKG0ngzlw-8eCoJnCf_8-QLxmVMhbCGp4rCUV8.jpg', name: 'Bất động sản - Xây dựng' },
        { image: 'https://storage.googleapis.com/a1aa/image/GQ2fHxBEb3tQyBM3hEgSHi8XTfQYouatsWd58yXVIGU.jpg', name: 'Doanh nghiệp' },
        { image: 'https://storage.googleapis.com/a1aa/image/lkaY8JcrAy2lZG6OzRbhk0ekiE5PiSlpvM3_hLSaNeg.jpg', name: 'Thuốc - TPCN' },
    ];


    return (
        <>
            <div className="container">
                <div className="category__title">Dự Án Sản Phẩm</div>
                <p>Hùng Thiên mang đến giải pháp thiết kế web chuyên nghiệp, trọn gói, phù hợp với từng lĩnh vực, ngành nghề kinh doanh của bạn</p>
                <div className="grid">
                    {categories.map((category, index) => (
                        <div className="grid-item" key={index}>
                            <img src={category.image} alt={category.name} />
                            <p>{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoryList;