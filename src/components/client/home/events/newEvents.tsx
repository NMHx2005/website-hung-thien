import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import "./newEvents.scss";
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { getEvents } from '../../../../services/api';
import { IEvent } from '../../../../types/models';

interface DisplayEvent {
    id: string;
    image: string;
    title: string;
    date: string;
    categories: string[];
    description: string;
}

const formatDate = (value?: string) => {
    if (!value) return 'Đang cập nhật';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Đang cập nhật';
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const truncate = (text: string, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trim()}…`;
};

const toDisplayEvent = (event: IEvent): DisplayEvent => {
    const dateSource = event.eventDate || event.publishedAt || event.createdAt;
    const categories = event.categories && event.categories.length > 0
        ? event.categories
        : (event.tags && event.tags.length > 0 ? event.tags : ['Tin tức']);

    return {
        id: event._id,
        image: event.image,
        title: event.title,
        date: formatDate(dateSource),
        categories,
        description: truncate(event.excerpt || event.content || '')
    };
};

export const NewEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchEvents = async () => {
            try {
                const response = await getEvents({
                    limit: 6,
                    order: 'desc',
                    sort: 'eventDate',
                    status: 'published'
                });
                if (!isMounted) return;
                const data = response?.data?.data ?? [];
                setEvents(Array.isArray(data) ? data : []);
            } catch (err) {
                if (!isMounted) return;
                console.error('Failed to load events', err);
                setError('Không thể tải tin tức sự kiện vào lúc này.');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchEvents();

        return () => {
            isMounted = false;
        };
    }, []);

    const posts = useMemo<DisplayEvent[]>(() => events.map(toDisplayEvent), [events]);

    return (
        <section className="events-section">
            <div className="events-container">
                <motion.div
                    className="events-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="events-badge">Bản tin</span>
                    <h2>Tin tức & sự kiện nổi bật</h2>
                    <p>Cập nhật hoạt động mới nhất và những câu chuyện truyền cảm hứng từ Hùng Thiên.</p>
                </motion.div>

                <div className="events-content">
                    {loading && <div className="events-state">Đang tải tin tức...</div>}
                    {!loading && error && <div className="events-state events-state--error">{error}</div>}
                    {!loading && !error && posts.length === 0 && (
                        <div className="events-state">Hiện chưa có tin tức nào.</div>
                    )}
                    {!loading && !error && posts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Swiper
                                spaceBetween={36}
                                slidesPerView={3}
                                loop={posts.length > 3}
                                autoplay={{ delay: 3200, disableOnInteraction: false }}
                                freeMode
                                pagination={{ clickable: true }}
                                modules={[FreeMode, Pagination, Autoplay]}
                                className="events-swiper"
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 18 },
                                    768: { slidesPerView: 2, spaceBetween: 24 },
                                    1024: { slidesPerView: 3, spaceBetween: 36 }
                                }}
                            >
                                {posts.map((post, index) => (
                                    <SwiperSlide key={post.id}>
                                        <motion.article
                                            className="event-card"
                                            initial={{ opacity: 0, y: 25 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.4 }}
                                            transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="event-card__media">
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                            <div className="event-card__body">
                                                <div className="event-card__meta">
                                                    <span className="event-card__date">{post.date}</span>
                                                    <span className="event-card__tags">{post.categories.join(", ")}</span>
                                                </div>
                                                <h3 className="event-card__title">{post.title}</h3>
                                                <p className="event-card__excerpt">{post.description}</p>
                                                <button className="event-card__cta" type="button">
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </motion.article>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};