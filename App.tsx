
import React, { useState } from 'react';
import { ModalType } from './types';
import Modal from './components/Modal';
import LinkButton from './components/LinkButton';

// --- SVG ICONS --- //
const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-white">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"></rect>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" strokeWidth="2"></path>
    </svg>
);
const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-full h-full text-white">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.287.468-1.028 3.746 3.824-1.002.452.274z"></path>
    </svg>
);
const EmailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
);
const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
);
const StarIcon: React.FC<{ filled?: boolean; className?: string; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void; }> = ({ filled, className, onClick, onMouseEnter, onMouseLeave }) => (
    <svg onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" className={`${className} ${onClick ? 'cursor-pointer' : ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
);

// --- MODAL CONTENT COMPONENTS --- //

const WhatsappModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [reasons, setReasons] = useState<string[]>([]);
    
    const handleCheckboxChange = (reason: string) => {
        setReasons(prev => prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]);
    };

    const handleSubmit = () => {
        if (!name || !age || reasons.length === 0) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        const message = `Olá! Meu nome é ${name}, tenho ${age} anos. Motivo da consulta: ${reasons.join(', ')}. Gostaria de agendar um horário.`;
        const whatsappUrl = `https://wa.me/5541999801734?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    const reasonOptions = ['Canal', 'Emergência', 'Clínico Geral', 'Outro'];

    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Agendamento via WhatsApp</h2>
            <p className="text-center text-gray-300 mb-6 text-sm">Preencha os dados abaixo para iniciar a conversa.</p>
            <div className="space-y-4">
                <input type="text" placeholder="Seu nome completo" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"/>
                <input type="number" placeholder="Sua idade" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"/>
                <div className="text-gray-200">
                    <label className="block mb-2 font-semibold">Motivo da consulta:</label>
                     <div className="grid grid-cols-2 gap-2 text-sm">
                        {reasonOptions.map(reason => (
                            <label key={reason} className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg cursor-pointer">
                                <input type="checkbox" checked={reasons.includes(reason)} onChange={() => handleCheckboxChange(reason)} className="form-checkbox h-5 w-5 text-white bg-transparent border-white/30 rounded focus:ring-white/50 ring-offset-black/20"/>
                                <span>{reason}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={handleSubmit} className="w-full mt-6 p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors duration-300">
                Enviar Mensagem
            </button>
        </div>
    );
};

const EmailModalContent: React.FC = () => (
    <div className="text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Contato por E-mail</h2>
        <form action="https://formsubmit.co/draisabellirighetto@gmail.com" method="POST" className="space-y-4">
            <input type="text" name="name" placeholder="Seu nome" required className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"/>
            <input type="email" name="email" placeholder="Seu e-mail" required className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"/>
            <textarea name="message" placeholder="Sua mensagem" rows={4} required className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"></textarea>
            <button type="submit" className="w-full mt-2 p-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors duration-300">Enviar E-mail</button>
        </form>
    </div>
);

const LocationModalContent: React.FC = () => {
    const address = "R. Cap. Tobias Pereira da Cruz, 1749 - Centro, São José dos Pinhais - PR, 83005-050";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Nossa Localização</h2>
            <p className="my-4 text-gray-200 text-lg leading-relaxed">{address}</p>
            <p className="mb-8 text-gray-300">Clique no botão abaixo para traçar a rota até nosso consultório.</p>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Abrir no Google Maps
            </a>
        </div>
    );
};

const RatingFeedbackModalContent: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-2 text-center">Que pena!</h2>
            <p className="text-center text-gray-300 mb-6">Sua opinião é muito importante. Conte-nos como podemos melhorar.</p>
            <form action="https://formsubmit.co/draisabellirighetto@gmail.com" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="Feedback de Avaliação (Link na Bio)" />
                <input type="hidden" name="rating" value={rating} />
                <textarea name="feedback" placeholder="Sua mensagem..." rows={5} required className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"></textarea>
                <button type="submit" className="w-full mt-2 p-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors duration-300">Enviar Feedback</button>
            </form>
        </div>
    );
};


const RatingModalContent: React.FC<{ 
    setActiveModal: (type: ModalType) => void; 
    onClose: () => void;
    setRating: (rating: number) => void;
}> = ({ setActiveModal, onClose, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);
    const googleReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJAfVjZcDl3JQRyOdJzVYc_Bc';

    const handleRatingClick = (ratingValue: number) => {
        setCurrentRating(ratingValue);
        setRating(ratingValue);
        if (ratingValue === 5) {
            window.open(googleReviewUrl, '_blank');
            onClose();
        } else {
            setActiveModal(ModalType.RATING_FEEDBACK);
        }
    };
    
    return (
       <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Sua avaliação é importante!</h2>
            <div className="flex justify-center items-center my-6 space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        filled={star <= (hoverRating || currentRating)}
                        className="w-10 h-10 text-yellow-400 transition-transform duration-200 hover:scale-125"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRatingClick(star)}
                    />
                ))}
            </div>
            <p className="text-gray-400 text-sm">Clique nas estrelas para avaliar.</p>
        </div>
    );
};

// --- MAIN APP COMPONENT --- //
const App: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rating, setRating] = useState(0);

    const handleLogoClick = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 2000); // duration of animation
    };
    
    const developerWhatsappUrl = `https://wa.me/5541988710303?text=${encodeURIComponent("Olá, vi o link da Dra. Isabelli Righetto e quero um site igual!")}`;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#d3bcae] via-[#FDF6F2] to-[#b78367] animated-gradient-text p-4 flex flex-col items-center justify-between text-gray-800">
            <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center flex-grow">
                <div className="w-full bg-gradient-to-br from-[#8c634c] via-[#c7b7a9] to-[#5a3f31] animated-gradient rounded-3xl shadow-2xl p-6 sm:p-8 text-center backdrop-blur-xl border border-white/10">
                    
                    <div className="mb-6" style={{ perspective: '1000px' }}>
                        <img 
                            src="/logo.svg" 
                            alt="Dr. Isabelli Righetto Logo" 
                            className={`w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full object-cover transition-transform duration-2000 ${isSpinning ? 'logo-spin' : ''}`}
                            onClick={handleLogoClick}
                            style={{ transformStyle: 'preserve-3d' }}
                        />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 animated-gradient-text">
                        Dra. Isabelli Righetto
                    </h1>

                    <p className="text-sm sm:text-base text-gray-300 mt-2 italic">"O sorriso é a manifestação dos sentimentos da alma."</p>

                    <div className="mt-8 space-y-3 sm:space-y-4">
                        <LinkButton icon={<InstagramIcon />} text="Instagram" onClick={() => window.open('https://www.instagram.com/isabellirighetto/', '_blank')} />
                        <LinkButton icon={<WhatsAppIcon />} text="Agendar Horário" onClick={() => setActiveModal(ModalType.WHATSAPP)} />
                        <LinkButton icon={<EmailIcon />} text="E-mail" onClick={() => setActiveModal(ModalType.EMAIL)} />
                        <LinkButton icon={<LocationIcon />} text="Localização" onClick={() => setActiveModal(ModalType.LOCATION)} />
                        <LinkButton icon={<StarIcon filled={true} className="text-yellow-400"/>} text="Avalie no Google" onClick={() => setActiveModal(ModalType.RATING)} />
                    </div>
                </div>

                {/* --- MODALS --- */}
                <Modal isOpen={activeModal !== ModalType.NONE} onClose={() => setActiveModal(ModalType.NONE)}>
                   {activeModal === ModalType.WHATSAPP && <WhatsappModalContent onClose={() => setActiveModal(ModalType.NONE)} />}
                   {activeModal === ModalType.EMAIL && <EmailModalContent />}
                   {activeModal === ModalType.LOCATION && <LocationModalContent />}
                   {activeModal === ModalType.RATING && <RatingModalContent setActiveModal={setActiveModal} onClose={() => setActiveModal(ModalType.NONE)} setRating={setRating} />}
                   {activeModal === ModalType.RATING_FEEDBACK && <RatingFeedbackModalContent rating={rating} />}
                </Modal>
            </main>

            <footer className="w-full max-w-md mx-auto text-center text-gray-600/80 text-xs py-4">
                 <a href={developerWhatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black transition-all duration-300 mb-4 text-xs sm:text-sm">
                    Quer um site incrível como esse? Fale comigo! 🚀
                </a>
                <p>
                    Desenvolvido por <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">InteligenciArte.IA ✨</a>
                </p>
            </footer>
        </div>
    );
};

export default App;
