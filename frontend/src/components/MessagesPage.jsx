import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import { Send, ArrowBack, Message } from '@mui/icons-material';
import messageService from '../services/messageService';
import swapsService from '../services/swapsService';
import './MessagesPage.css';
import './ProfilePage.css';

const MessagesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const [refreshInterval, setRefreshInterval] = useState(null);

  const menuItems = [
    { path: '/profile', label: 'Profil', icon: '👤' },
    { path: '/discover', label: 'Keşfet', icon: '🔍' },
    { path: '/requests', label: 'İsteklerim', icon: '📬' },
    { path: '/messages', label: 'Mesajlar', icon: '💬' },
    { path: '/suggestions', label: 'Öneriler', icon: '💡' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    // URL'de userId varsa o konuşmayı aç
    if (userId && conversations.length > 0) {
      const user = conversations.find(c => c.other_user_id == userId);
      if (user) {
        setSelectedConversation(user);
        loadMessages(user.other_user_id);
      }
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [userId, conversations]);

  useEffect(() => {
    // Seçili konuşma varsa mesajları yükle ve otomatik yenile
    if (selectedConversation) {
      loadMessages(selectedConversation.other_user_id);
      
      // Her 3 saniyede bir mesajları yenile
      const interval = setInterval(() => {
        loadMessages(selectedConversation.other_user_id);
      }, 3000);
      
      setRefreshInterval(interval);
      
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Yeni mesaj geldiğinde scroll yap
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await messageService.getConversations();

      if (result.success) {
        setConversations(result.data.conversations || []);
        
        // URL'de userId varsa o konuşmayı seç
        if (userId) {
          const user = result.data.conversations.find(c => c.other_user_id == userId);
          if (user) {
            setSelectedConversation(user);
          }
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Konuşmalar yüklenirken hata:', err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (otherUserId) => {
    try {
      const result = await messageService.getConversation(otherUserId);

      if (result.success) {
        setMessages(result.data.messages || []);
      }
    } catch (err) {
      console.error('Mesajlar yüklenirken hata:', err);
    }
  };

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    navigate(`/messages/${conversation.other_user_id}`);
    loadMessages(conversation.other_user_id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) {
      return;
    }

    setSending(true);

    try {
      const result = await messageService.sendMessage(
        selectedConversation.other_user_id,
        newMessage.trim()
      );

      if (result.success) {
        setNewMessage('');
        // Mesajları yeniden yükle
        await loadMessages(selectedConversation.other_user_id);
        // Konuşmaları yeniden yükle (son mesaj güncellenir)
        await loadConversations();
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Mesaj gönderme hatası:', err);
      setError('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Şimdi';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} saat önce`;
    
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCurrentUserId = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).id;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  return (
    <div className="profile-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">
            <span>SW</span>APS
          </h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="profile-content messages-content">
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', height: 'calc(100vh - 200px)', gap: 2 }}>
            {/* Konuşma Listesi */}
            <Box sx={{ width: '300px', borderRight: '1px solid #e2e8f0' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0' }}>
                <Typography variant="h6" component="div">
                  Konuşmalar
                </Typography>
              </Box>
              <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
                {conversations.length === 0 ? (
                  <ListItem>
                    <ListItemText
                      primary="Henüz konuşma yok"
                      secondary="Kabul edilen eşleşmelerinizle mesajlaşabilirsiniz"
                    />
                  </ListItem>
                ) : (
                  conversations.map((conversation) => (
                    <ListItem
                      key={conversation.other_user_id}
                      button
                      selected={selectedConversation?.other_user_id === conversation.other_user_id}
                      onClick={() => selectConversation(conversation)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                    >
                      <ListItemText
                        primary={conversation.other_user_name}
                        secondary={
                          conversation.last_message
                            ? conversation.last_message.content.substring(0, 30) + '...'
                            : 'Henüz mesaj yok'
                        }
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </Box>

            {/* Mesaj Alanı */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {selectedConversation ? (
                <>
                  {/* Mesaj Başlığı */}
                  <Paper sx={{ p: 2, borderRadius: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton onClick={() => navigate('/messages')} size="small">
                        <ArrowBack />
                      </IconButton>
                      <Typography variant="h6">
                        {selectedConversation.other_user_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedConversation.other_user_email}
                      </Typography>
                    </Box>
                  </Paper>

                  <Divider />

                  {/* Mesajlar */}
                  <Box
                    sx={{
                      flex: 1,
                      overflow: 'auto',
                      p: 2,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    {messages.length === 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          color: 'text.secondary',
                        }}
                      >
                        <Typography>Henüz mesaj yok. İlk mesajınızı gönderin!</Typography>
                      </Box>
                    ) : (
                      messages.map((message) => {
                        const isOwn = message.sender_id == getCurrentUserId();
                        return (
                          <Box
                            key={message.message_id}
                            sx={{
                              display: 'flex',
                              justifyContent: isOwn ? 'flex-end' : 'flex-start',
                              mb: 2,
                            }}
                          >
                            <Paper
                              sx={{
                                p: 1.5,
                                maxWidth: '70%',
                                backgroundColor: isOwn ? '#1976d2' : 'white',
                                color: isOwn ? 'white' : 'text.primary',
                              }}
                            >
                              <Typography variant="body1">{message.content}</Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mt: 0.5,
                                  opacity: 0.7,
                                }}
                              >
                                {formatTime(message.timestamp)}
                              </Typography>
                            </Paper>
                          </Box>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </Box>

                  <Divider />

                  {/* Mesaj Gönderme */}
                  <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Mesajınızı yazın..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={sending}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                      startIcon={<Send />}
                    >
                      Gönder
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    flexDirection: 'column',
                    gap: 2,
                    color: 'text.secondary',
                  }}
                >
                  <Message sx={{ fontSize: 64 }} />
                  <Typography variant="h6">Bir konuşma seçin</Typography>
                  <Typography variant="body2">
                    Sol taraftan bir konuşma seçerek mesajlaşmaya başlayın
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

