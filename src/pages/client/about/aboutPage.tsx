


import { useEffect, useState } from 'react';
import { getPageBySlug } from '@/services/api';

const AboutPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<any>(null);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const res = await getPageBySlug('about');
                if (!isMounted) return;
                setPage(res.data?.data ?? null);
            } catch (e: any) {
                if (!isMounted) return;
                setError(e?.response?.data?.message || 'Không thể tải nội dung');
            } finally {
                if (isMounted) setLoading(false);
            }
        })();
        return () => { isMounted = false; }
    }, []);

    if (loading) return (<><h1>About</h1><p>Đang tải...</p></>);
    if (error) return (<><h1>About</h1><p>{error}</p></>);

    return (
        <>
            <h1>About</h1>
            {page ? (
                <div>
                    <h2>{page.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </>
    )
}


export default AboutPage;