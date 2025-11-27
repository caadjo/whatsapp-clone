import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, CheckCheck } from 'lucide-react';

function MessageBubble({ message, isOwn }) {
    const formatTime = (dateTime) => {
        if (!dateTime) return '';
        try {
            return format(new Date(dateTime), 'HH:mm', { locale: ptBR });
        } catch {
            return '';
        }
    };

    const renderMessageContent = () => {
        if (message.type === 'IMAGE' && message.media) {
            let imageUrl;
            if (Array.isArray(message.media)) {
                imageUrl = `data:image/jpeg;base64,${btoa(String.fromCharCode(...message.media))}`;
            } else if (typeof message.media === 'string') {
                imageUrl = message.media.startsWith('data:') 
                    ? message.media 
                    : `data:image/jpeg;base64,${message.media}`;
            } else {
                imageUrl = message.media;
            }
            
            return (
                <div>
                    <img 
                        src={imageUrl} 
                        alt="Imagem" 
                        className="max-w-xs rounded-lg mb-1 cursor-pointer hover:opacity-90 transition" 
                    />
                    {message.content && (
                        <p className="text-sm mt-1">{message.content}</p>
                    )}
                </div>
            );
        }
        return <p className="text-sm whitespace-pre-wrap break-words">{message.content || ''}</p>;
    };

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1 px-1`}>
            <div
                className={`max-w-[65%] px-2 py-1 rounded-lg shadow-sm ${
                    isOwn
                        ? 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none'
                        : 'bg-white text-[#111b21] rounded-tl-none'
                }`}
            >
                {renderMessageContent()}
                <div className={`flex items-center justify-end mt-0.5 space-x-1 ${
                    isOwn ? 'text-[#667781]' : 'text-[#667781]'
                }`}>
                    <span className="text-[10px]">{formatTime(message.createdAt)}</span>
                    {isOwn && (
                        <span className="ml-0.5">
                            {message.state === 'SEEN' ? (
                                <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                            ) : (
                                <Check className="w-3.5 h-3.5" />
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;
